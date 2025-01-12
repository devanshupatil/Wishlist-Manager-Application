// models/userModel.js
const supabase = require('../config/db')

const Product = supabase.from('products')

// models/productModel.js
class ProductModel {
    static validateProduct(productData) {
        const errors = []

        if (!productData.product_name) {
            errors.push('Product name is required')
        }

        if (!productData.product_url) {
            errors.push('Amazon product URL is required')
        }

        if (!productData.current_price || productData.current_price <= 0) {
            errors.push('Current price is required and must be greater than 0')
        }

        if (!productData.target_price || productData.target_price <= 0) {
            errors.push('Target price is required and must be greater than 0')
        }

        if (!productData.category || !['Want to buy soon', 'Maybe later'].includes(productData.category)) {
            errors.push('Valid category is required (Want to buy soon/Maybe later)')
        }

        if (!productData.priority || !['High', 'Medium', 'Low'].includes(productData.priority)) {
            errors.push('Valid priority is required (High/Medium/Low)')
        }

        if (errors.length > 0) {
            throw new Error(errors.join(', '))
        }

        return true
    }

    static async create(productData) {
        this.validateProduct(productData)
        
        const productWithDate = {
            ...productData,
            added_date: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('products')
            .insert([productWithDate])
            .select()

        if (error) throw error
        return data[0]
    }

    static async getAll(userId) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('user_id', userId)
            .order('added_date', { ascending: false })

        if (error) throw error
        return data
    }

    static async getByCategory(userId, category) {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('user_id', userId)
            .eq('category', category)

        if (error) throw error
        return data
    }

    static async searchByName(userId, searchTerm) {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('user_id', userId)
            .ilike('product_name', `%${searchTerm}%`)

        if (error) throw error
        return data
    }

    static async update(id, userId, updateData) {
        // If updating core fields, validate them
        if (Object.keys(updateData).some(key => 
            ['product_name', 'product_url', 'current_price', 'target_price', 'category', 'priority'].includes(key))) {
            this.validateProduct({ ...await this.getById(id), ...updateData })
        }

        const { data, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', userId) // Ensure user owns the product
            .select()

        if (error) throw error
        return data[0]
    }

    static async delete(id, userId) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)
            .eq('user_id', userId) // Ensure user owns the product

        if (error) throw error
        return true
    }

    static async getById(id) {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    static async getSortedByPrice(userId, ascending = true) {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('user_id', userId)
            .order('current_price', { ascending })

        if (error) throw error
        return data
    }

    static async getSortedByDate(userId, ascending = false) {
        const { data, error } = await supabase
            .from('products')
            .select()
            .eq('user_id', userId)
            .order('added_date', { ascending })

        if (error) throw error
        return data
    }
}

module.exports = ProductModel