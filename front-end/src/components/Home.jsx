import { Plus, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';



const Home = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAccessToken } = useAuth();
  const URL = import.meta.env.VITE_BACKEND_URL

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      window.location.href = '/';
    } else {
      document.title = 'Wishlist Manager';
    }
  }, []);


  const [formData, setFormData] = useState({
    name: '',
    productUrl: '',
    currentPrice: '',
    targetPrice: '',
    category: '',
    priority: '',
    notes: ''
  });




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add current date
    const currentDate = new Date().toISOString();
    const finalData = {
      ...formData,
      addedDate: currentDate
    };


    try {

      const response = await fetch(`${URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(finalData)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item');
      }

      toast.success('Item added successfully');
      setFormData({
        name: '',
        productUrl: '',
        currentPrice: '',
        targetPrice: '',
        category: '',
        priority: '',
        notes: ''
      });

    } catch (error) {
      toast.error('Failed to add item');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };






  return (

    <motion.div
      variants={variants} initial="initial" animate="animate" exit="exit"
    >
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">



        <div className="w-full max-w-2xl transform transition-all duration-500 hover:shadow-xl animate-fade-in">

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              Add New Product
            </h2>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  placeholder="Enter product name"
                />
              </div>

              {/* Product URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product URL *
                </label>
                <input
                  type="url"
                  name="productUrl"
                  required
                  value={formData.productUrl}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  placeholder="https://example.com/product"
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Price *
                  </label>
                  <input
                    type="number"
                    name="currentPrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.currentPrice}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Target Price *
                  </label>
                  <input
                    type="number"
                    name="targetPrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Priority *
                </label>
                <div className="flex gap-4">
                  {['low', 'medium', 'high'].map((priority) => (
                    <label
                      key={priority}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  placeholder="Add any additional notes here..."
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium 
                     transform transition-all duration-300 
                     hover:bg-blue-600 hover:scale-[1.02] 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     flex items-center justify-center gap-2 group"
              >

                {isSubmitting ? 'Adding...' : 'Add New Product'}
                <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />

                
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;
