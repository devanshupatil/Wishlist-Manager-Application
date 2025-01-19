import{ useState,useRef } from 'react';
import { X, Plus, Link, DollarSign, Tag, ListTodo, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContex';
// import { Loading } from './Loading';


const AddItems = () => {
  const [formData, setFormData] = useState({
    url: '',
    price: '',
    name: '',
    targetPrice: '',
    category: '',
    notes: '',
    priority: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [items, setItems] = useState([]);
  const addItemFormRef = useRef(null);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { getAccessToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Others'
  ];

  const priorities = [
    'High',
    'Medium',
    'Low'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);


    const form = addItemFormRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);


    const newItem = {
      name: formData.get('name') || '',
      productUrl: formData.get('productUrl') || '',
      currentPrice: parseFloat(formData.get('currentPrice')) || 0,
      targetPrice: parseFloat(formData.get('targetPrice')) || 0,
      description: formData.get('description') || '',
      category: formData.get('category') || '',
      priority: formData.get('priority') || ''
    };

    if (!newItem.name || !newItem.productUrl) {
      toast.error('Please fill in all required fields');
      return;
    }


    try {

      

      const response = await fetch(`${URL}/api/products`, {

        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(newItem)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    //   const data = await response.json();

    //   setItems(prevItems => [...prevItems, data]);

      form.reset();

      toast.success('Item added successfully!');

     

    } catch (error) {

      console.error('Error adding item:', error);
      toast.error('Failed to add item');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4 flex items-start justify-center">
      {/* Add Item Button */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Item</span>
        </button>
      )}

      {/* Form Card */}
      <div className={`w-full max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ${
        isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
            <button
              onClick={() => setIsFormVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Link className="h-4 w-4 mr-2" />
                Product URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Current Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter product name"
              />
            </div>

            {/* Target Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Target Price
              </label>
              <input
                type="number"
                name="targetPrice"
                value={formData.targetPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select a priority</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Adding Item...' : 'Add Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;