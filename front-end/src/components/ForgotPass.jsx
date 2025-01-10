import { useState } from 'react';
import { toast } from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.target.elements.email.value;

    if (!emailInput) {
      setError('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }
    setEmail(emailInput);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        toast.error(data.error);
      } else {
        setError(null);
        toast.success('Password reset email sent!');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/">
                Login here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                  <div className="relative">
                    <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                  </div>
                  {error && <p className="text-xs text-red-600 mt-2" id="email-error">{error}</p>}
                </div>
                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPass;
