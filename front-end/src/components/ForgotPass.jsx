import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      window.location.href = '/';
    } else {
      window.location.href = '/home';
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = e.target.elements.email.value;

    if (!emailInput) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailInput);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-8.997zM12 16c-1.657 0-3-1.343-3-3 0-.343.022-.659.063-.974l.974.063c1.457.091 2.732 1.03 2.732 2.823 0 1.792-1.275 3.233-2.732 3.233z" />
              </svg>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {}}
          >
            Back to Sign In
            </a>

            <a href="/reset-password">Reset Password</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
