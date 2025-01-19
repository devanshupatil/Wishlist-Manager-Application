import { useState, useEffect } from 'react';
import { X, Link, DollarSign, Tag, ListTodo, Calendar, Save, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const UpdateItem = ({ item, onSubmit, onDelete }) => {
    
  const [formData, setFormData] = useState(item);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Others'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setIsDirty(false);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await onDelete(item.id);
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  useEffect(() => {
    setFormData(item);
  }, [item]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-start justify-center">
      {/* Update Button */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
        >
          <Save className="h-5 w-5" />
          <span>Update Item</span>
        </button>
      )}

      {/* Form Card */}
      <div className={`w-full max-w-lg bg-white rounded-lg shadow-lg transform transition-all duration-300 ${
        isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Update Item</h2>
            <button
              onClick={() => setIsFormVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6 text-sm text-gray-500">
            Added on: {new Date(formData.addedDate).toLocaleDateString()}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product URL */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Link className="h-4 w-4 mr-2" />
                Product URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
                placeholder="https://example.com/product"
              />
            </div>

            {/* Price */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Current Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
                placeholder="Enter product name"
              />
            </div>

            {/* Target Price */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Target Price
              </label>
              <input
                type="number"
                name="targetPrice"
                value={formData.targetPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Category */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 group-hover:border-green-300"
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className={`flex-1 bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  (isSubmitting || !isDirty) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                <Save className="h-5 w-5" />
                <span>{isSubmitting ? 'Updating...' : 'Update Item'}</span>
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-red-700 flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    targetPrice: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    notes: PropTypes.string,
    addedDate: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UpdateItem;