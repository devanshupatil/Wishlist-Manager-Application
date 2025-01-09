import { useState, useRef, useEffect } from 'react';
import toast from "react-hot-toast";

const Home = () => {

  const [items, setItems] = useState([]);
  const addItemFormRef = useRef(null);
  const searchInputRef = useRef(null);
  const sortSelectRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await fetch('/api/products');
        const data = await response.json();

        setItems(data);
      } catch (error) {

        console.error('Error fetching products:', error);

      }
    };

    fetchProducts();
  }, []);

  const handleRefresh = async () => {

      try {
  
        const response = await fetch('/api/products');
        const data = await response.json();
  
        setItems(data);
      } catch (error) {
  
        console.error('Error fetching products:', error);
  
      }
    
  };

const handleDelete = async (id) => {
  try {

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {

      setItems(items.filter(item => item._id !== id));
      toast.success('Product deleted successfully');

    } else {

      toast.error('Failed to delete product');

    }
  } catch (error) {

    console.error('Error deleting product:', error);
    toast.error('An error occurred while deleting the product');
  }
};

const handleUpdate = async (id) => {
  try {

    const itemToUpdate = items.find(item => item._id === id);

    if (!itemToUpdate) {
      
      toast.error('Item not found');
      return;
    }

    // Populate the 'add new item card' inputs with the item data
    addItemFormRef.current.querySelector('input[name="name"]').value = itemToUpdate.name;
    addItemFormRef.current.querySelector('input[name="productUrl"]').value = itemToUpdate.productUrl;
    addItemFormRef.current.querySelector('input[name="currentPrice"]').value = itemToUpdate.currentPrice;
    addItemFormRef.current.querySelector('input[name="targetPrice"]').value = itemToUpdate.targetPrice;
    addItemFormRef.current.querySelector('textarea[name="description"]').value = itemToUpdate.description;
    addItemFormRef.current.querySelector('select[name="category"]').value = itemToUpdate.category;

    // Scroll to the 'add new item card'
    addItemFormRef.current.scrollIntoView({ behavior: 'smooth' });

    // Update the form submission handler to use PUT instead of POST
    const originalSubmit = addItemFormRef.current.onsubmit;
    addItemFormRef.current.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedData = Object.fromEntries(formData.entries());

      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setItems(items.map(item => item._id === id ? updatedProduct : item));
        toast.success('Product updated successfully');
        // Reset form and its submit handler
        e.target.reset();
        addItemFormRef.current.onsubmit = originalSubmit;
      } else {
        toast.error('Failed to update product');
      }
    };

    toast.success('Item loaded for update. Make changes and submit to update.');
  } catch (error) {
    console.error('Error preparing update:', error);
    toast.error('An error occurred while preparing the update');
  }
};


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = addItemFormRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    console.log("fromData", formData);

    // Validate all required fields are present
    const newItem = {
      name: formData.get('name') || '',
      productUrl: formData.get('productUrl') || '',
      currentPrice: parseFloat(formData.get('currentPrice')) || 0,
      targetPrice: parseFloat(formData.get('targetPrice')) || 0,
      description: formData.get('description') || '',
      category: formData.get('category') || '',
      priority: formData.get('priority') || ''
    };

  
    // Validate the data before sending
    if (!newItem.name || !newItem.productUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setItems(prevItems => [...prevItems, data]);
      form.reset();
      toast.success('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
     
    }
  };

  const handleSearch = () => {
    const searchQuery = searchInputRef.current.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));
    setItems(filteredItems);
  };

  const handleSort = () => {
    const sortOption = sortSelectRef.current.value;
    let sortedItems = [...items];

    if (sortOption === 'date') {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'price') {
      sortedItems.sort((a, b) => a.currentPrice - b.currentPrice);
    }

    setItems(sortedItems);
  };

  // Render items list
  const itemsList = items.map(item => (

    <div key={item._id} className="item-card bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleUpdate(item._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      <h3 className="item-name text-lg font-bold text-gray-900 mb-2">Product Name: {item.name}</h3>
      {/* <p>Product Id: {item._id}</p> */}
      <p className="item-url text-blue-500 mb-2">
        <a href={item.productUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Product URL:
          {item.productUrl}
        </a>
      </p>
      <p className="item-current-price text-gray-700 mb-1">Current Price: <span className="font-semibold">${item.currentPrice}</span></p>
      <p className="item-target-price text-gray-700 mb-1">Target Price: <span className="font-semibold">${item.targetPrice}</span></p>
      <p className="item-description text-gray-600 mb-1">Description: <span className="font-semibold">{item.description || 'No description available'} </span> </p>
      <p className="item-category text-gray-700 mb-1">Category: <span className="font-semibold">{item.category}</span></p>
      <p className="item-priority text-gray-700">Priority: <span className="font-semibold">{item.priority}</span></p>
      <p className="item-created-at text-gray-700">Created At: <span className="font-semibold">{item.createdAt}</span></p>

    </div>
  ));

  // console.log("Items array:", items);
  // console.log("Unique _id values:", [...new Set(items.map(item => item._id))]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Wishlist Manager</h1>
      {/* Add Item Form */}
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-10 mb-12">
        <h5 className="text-xl font-semibold mb-4 text-center">Add New Item</h5>
        <form ref={addItemFormRef} className="space-y-4" onSubmit={(e) => {
          handleSubmit(e);
          toast.success('Item added successfully!');
        }}>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              id="productName"
              name="name"  // Added name attribute
              placeholder="Product Name"
              required
            />
            <input
              type="url"
              className="w-full px-3 py-2 border rounded"
              id="productUrl"
              name="productUrl"  // Added name attribute
              placeholder="Amazon URL"
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              id="currentPrice"
              name="currentPrice"  // Added name attribute
              placeholder="Current Price"
              step="0.01"
              required
            />
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              id="targetPrice"
              name="targetPrice"  // Added name attribute
              placeholder="Target Price"
              step="0.01"
            />
            <select
              className="w-full px-3 py-2 border rounded"
              id="priority"
              name="priority"  // Added name attribute
              required
            >
              <option value="">Select Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="w-full px-3 py-2 border rounded"
              id="category"
              name="category"  // Added name attribute
              required
            >
              <option value="">Select Category</option>
              <option value="WANT_TO_BUY_SOON">Want to buy soon</option>
              <option value="MAYBE_LATER">Maybe later</option>
            </select>
            <textarea
              className="w-full px-3 py-2 border rounded"
              id="notes"
              name="description"  // Added name attribute
              placeholder="Notes (optional)"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </form>
      </div>
      {/* Search and Sort Controls */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          id="searchInput"
          placeholder="Search items..."
          ref={searchInputRef}
          onChange={handleSearch}
        />
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded"
          id="sortSelect"
          ref={sortSelectRef}
          onChange={(e) => {
            handleSort(e);
            toast.success('Sorting updated');
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      {/* Items List */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">Your Wishlist Items</h5>
          <button 
            onClick={handleRefresh} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>
        <div id="itemsList" className="space-y-4">
          {itemsList}
        </div>
      </div>
    </div>
  );
};

export default Home;
