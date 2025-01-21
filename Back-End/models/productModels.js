// models/userModel.js
const supabase = require('../config/db')

const Product = {

  create: async (productData, userId) => {
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...productData, user_id: userId }])
      .select();
    if (error) throw error;
    return data[0];
  },

 getById: async (id) => {
    if (!id) {
      throw new Error('Invalid ID');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id);
        
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Server Error: Unable to retrieve product');
    }
  },

  getAllById: async (id) => {
    if (!id) {
      throw new Error('Invalid ID or User ID');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Server Error: Unable to retrieve product');
    }
  },

  update: async (id, updateData, userId) => {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select();
    if (error) throw error;
    return data[0];
  },

  delete: async (id, userId) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw error;
    return true;
  }
};

module.exports = Product;