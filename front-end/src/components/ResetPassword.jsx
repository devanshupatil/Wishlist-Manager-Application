import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../config/supabase';


const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
      });
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [resetStatus, setResetStatus] = useState(null);
     
    
      const passwordRequirements = [
        { label: 'At least 8 characters', test: pwd => pwd.length >= 8 },
        { label: 'Contains uppercase letter', test: pwd => /[A-Z]/.test(pwd) },
        { label: 'Contains lowercase letter', test: pwd => /[a-z]/.test(pwd) },
        { label: 'Contains number', test: pwd => /[0-9]/.test(pwd) },
        { label: 'Contains special character', test: pwd => /[^A-Za-z0-9]/.test(pwd) },
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
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setResetStatus({ success: false, message: 'Passwords do not match' });
          return;
        }
    
        // Validate all password requirements
        const meetsAllRequirements = passwordRequirements.every(req => 
          req.test(formData.password)
        );
    
        if (!meetsAllRequirements) {
          setResetStatus({ success: false, message: 'Password does not meet all requirements' });
          return;
        }
    
        setIsSubmitting(true);
        
        // Simulate API call
        try {
          const { error } = await supabase.auth.updateUser({
            password: formData.password,
          });

          if (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to reset password. Please try again.');
            return;
          }

          setResetStatus({ success: true, message: 'Password reset successful!' });
          toast.success('Password reset successful!');

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
          

        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('Failed to reset password. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
            <p className="text-center text-gray-600 mb-8">
              Please enter your new password below
            </p>
    
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
    
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
    
              {/* Password Requirements */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                <ul className="space-y-1">
                  {passwordRequirements.map(({ label, test }, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      {test(formData.password) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300" />
                      )}
                      <span className={test(formData.password) ? "text-green-500" : "text-gray-500"}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
    
              {/* Status Message */}
              {resetStatus && (
                <div className={`p-3 rounded-lg ${
                  resetStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {resetStatus.message}
                </div>
              )}
    
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      );
    };

export default ResetPassword;