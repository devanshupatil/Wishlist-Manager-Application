const supabase = require('../config/db');

class UserModel {
    static validateUser(userData) {
        const errors = []

        if (!userData.email) {
            
            errors.push('Email is required')
        } else if (!userData.email.includes('@')) {
            errors.push('Invalid email format')
        }

        if (!userData.name) {
            errors.push('Name is required')
        }

        if (!userData.password) {
            errors.push('Password is required')
        } else if (userData.password.length < 6) {
            errors.push('Password must be at least 6 characters')
        }

        if (errors.length > 0) {
            throw new Error(errors.join(', '))
        }

        return true
    }

    static async create(userData) {
        this.validateUser(userData)

        // In a real application, you'd hash the password here
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()

        if (error) throw error
        return data[0]
    }

    static async findByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .single()

        if (error) throw error
        return data
    }

    static async update(id, userData) {
        // Only validate if updating core user fields
        if (userData.email || userData.name || userData.password) {
            this.validateUser({ ...await this.getById(id), ...userData })
        }

        const { data, error } = await supabase
            .from('users')
            .update(userData)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    }

    static async getById(id) {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }
}

module.exports = UserModel