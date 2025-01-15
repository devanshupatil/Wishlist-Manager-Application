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

  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  getById: async (id, userId) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return data;
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