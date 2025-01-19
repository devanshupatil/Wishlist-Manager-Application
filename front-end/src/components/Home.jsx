import { useState, useRef, useEffect } from 'react';
import toast from "react-hot-toast";
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContex';
import { Calendar, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from '../utlis/formatDate';


const Home = () => {
  const { getAccessToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
  // const addItemFormRef = useRef(null);
  const searchInputRef = useRef(null);
  const sortSelectRef = useRef(null);


  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL}/api/products`, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setItems([]);
    }
  };

  useEffect(() => {
    handleEmailLogic();
    fetchProducts();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    }
  };



  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/api/products/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
        toast.success('Product deleted successfully');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product');
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = () => {
    const searchQuery = searchInputRef.current.value.toLowerCase();
    const filteredItems = items.filter(item => item.product_name.toLowerCase().includes(searchQuery));
    setItems(filteredItems);
  };

  const handleSort = () => {
    const sortOption = sortSelectRef.current.value;
    let sortedItems = [...items];
    if (sortOption === 'date') {
      sortedItems.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
    } else if (sortOption === 'price') {
      sortedItems.sort((a, b) => a.current_price - b.current_price);
    }
    setItems(sortedItems);
  };

  const handleEmailLogic = async () => {
    const itemsOnTarget = items.filter(item => item.current_price <= item.target_price);

    if (itemsOnTarget.length > 0) {
      try {
        await EmailSend(itemsOnTarget);  // Just pass the filtered items
        toast.success(`Email sent for ${itemsOnTarget.length} item(s) on target`);
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error('Failed to send email notification');
      }
    }
  };

  const EmailSend = async (items) => {  // Accept items as parameter
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      // Create a formatted email body with item details
      const emailBody = items.map(item =>
        `Product: ${item.product_name}\n` +
        `Current Price: ${item.current_price}\n` +
        `Target Price: ${item.target_price}\n`
      ).join('\n');

      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: JSON.stringify({
          to: data.user.email,
          subject: 'Your Wishlist Update',
          body: `The following items have reached their target price:\n\n${emailBody}`
        })
      });

      if (emailError) throw emailError;
      // Don't show success toast here since it's already shown in handleEmailLogic
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;  // Propagate error to handleEmailLogic
    } finally {
      setLoading(false);
    }
  };


  const itemsList = Array.isArray(items) ? items.map(item => (
    <div key={item.id} className={`item-card bg-white shadow-lg rounded-lg p-6 mb-6 ${item.current_price <= item.target_price ? 'border-green-500 border-2' : ''}`}>
      {item.current_price <= item.target_price && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-r" role="alert">
          <p className="font-bold">Great news!</p>
          <p>The price has reached or dropped below your target. It's time to make your purchase!</p>
        </div>
      )}
      <div className="flex justify-end mb-4">

        <button
          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
          onClick={() => window.location.href = '/update-item/' + item.id}
        >
          <a href={`/`}>
            <PencilLine
              className="text-black group-hover:text-blue-500"
              size={20}
            />
          </a>
        </button>

        <button
          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
          onClick={() => handleDelete(item.id)}
        >
          <Trash2
            className="text-black group-hover:text-pink-500"
            size={20}
          />
        </button>

        <div className="gap-x-2 flex ">
          <Calendar className="text-black" size={20} />
          {FormatDate(item.added_date)}
        </div>


      </div>
      <h3 className="item-name text-lg font-bold text-gray-900 mb-2">Product Name: {item.product_name}</h3>
      <p className="item-url text-blue-500 mb-2">
        <a href={item.product_url} target="_blank" rel="noopener noreferrer" className='item-product_url text-gray-700 mb-1'>
          Product URL: <span className="break-words hover:underline text-blue-500 mb-2">
            {item.product_url ? (item.product_url.length > 50 ? item.product_url.substring(0, 50) + '...' : item.product_url) : 'N/A'}
          </span>
        </a>
      </p>
      <p className="item-current-price text-gray-700 mb-1">Current Price: <span className="font-semibold">₹{item.current_price ? item.current_price.toLocaleString('en-IN') : 'N/A'}</span></p>
      <p className="item-target-price text-gray-700 mb-1">Target Price: <span className="font-semibold">₹{item.target_price ? item.target_price.toLocaleString('en-IN') : 'N/A'}</span></p>
      <p className="item-description text-gray-600 mb-1">Description: <span className="font-semibold">{item.notes || 'No description available'} </span> </p>
      <p className="item-category text-gray-700 mb-1">Category: <span className="font-semibold">{item.category}</span></p>
      <p className="item-priority text-gray-700">Priority: <span className="font-semibold">{item.priority}</span></p>
      <p className="item-created-at text-gray-700">Created At: <span className="font-semibold">{new Date(item.added_date).toLocaleDateString()}</span></p>
    </div>
  )) : [];

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      localStorage.removeItem('sb-phijictojbnypvqnixkd-auth-token');
      window.location.href = '/';
      toast.success('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await supabase.auth.admin.deleteUser(profile?.user?.id);
      await supabase.auth.signOut();
      localStorage.removeItem('sb-phijictojbnypvqnixkd-auth-token');
      toast.success('Account deleted successfully');
      window.location.href = '/signup';
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/home">

                <h1 className="text-white font-bold text-xl font-sans italic">Wishlist Manager</h1>
                </a>
              </div>
            </div>
            <div className="flex items-center">

              <p className="text-gray-300 mr-4 hover:underline">{profile?.user?.email}</p>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Wishlist Manager</h1>

        <button
          onClick={() => {
            window.location.href = '/additems';
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Items
        </button>

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
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-semibold">Your Wishlist Items</h5>

          </div>
          <div id="itemsList" className="space-y-4">
            {itemsList}
            {items.length === 0 && <p className="text-gray-600">No items found.</p>}

          </div>
        </div>
      </div>
    </div >

  );
};

export default Home;
