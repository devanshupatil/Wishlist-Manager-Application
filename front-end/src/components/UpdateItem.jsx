import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';



const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const UpdateItem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    productUrl: '',
    currentPrice: '',
    targetPrice: '',
    category: '',
    priority: '',
    notes: '',
  });
  const { getAccessToken } = useAuth();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchItem = async () => {
    try {
      const response = await fetch(`${URL}/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        }
      });
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);


  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      const response = await fetch(`${URL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({
          ...formData,
          added_date: new Date().toISOString()
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update item');
      }

      toast.success('Item updated successfully');

      window.history.back();
      Navbar({ isHome: false, isLists: true });


    } catch (error) {
      toast.error('Failed to update item');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBack = () => {
    window.history.back();
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Others'
  ];

  const priorities = [
    'Low',
    'Medium',
    'High'
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onBack}
        className="absolute -left-16 top-6 p-2 transition-all duration-200 hover:scale-110 hover:text-primary"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-card rounded-lg shadow-lg"
      >

        <h1
          className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Update Item
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-8 bg-gray-10 rounded-lg shadow-lg transition-all duration-200">
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >

            </motion.div>
          )}

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="product_name" className="text-sm font-medium">Name</label>
            <input
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
              placeholder="Enter product name" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="product_url" className="text-sm font-medium">Product URL</label>
            <input
              id="product_url"
              name="product_url"
              value={formData.product_url}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
              placeholder="https://example.com/product"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="current_price" className="text-sm font-medium">Current Price</label>
              <input
                id="currentPrice"
                name="current_price"
                type="number"
                step="0.01"
                value={formData.current_price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="target_price" className="text-sm font-medium">Target Price</label>
              <input
                id="target_price"
                name="target_price"
                type="number"
                step="0.01"
                value={formData.target_price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"

                placeholder="0.00"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className='w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300'
            >
              <option value="" disabled selected className='text-gray-400'>Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Priority *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className='w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 '
            >
              <option value="" disabled selected className='text-gray-400'>Select a priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
              placeholder="Add any additional notes here..."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-3 px-6 rounded-lg font-medium 
              transform transition-all duration-300 
             hover:bg-blue-950/90 hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              flex items-center justify-center gap-2 group"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Updating...' : 'Update Item'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default UpdateItem;
