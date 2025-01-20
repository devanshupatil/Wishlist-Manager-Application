import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../config/supabase'
import { toast } from 'react-toastify'



const Navbar = () => {

  const [loading, setLoading] = useState(false);
  const [isHome, setIsHome] = React.useState(true);
  const [isLists, setIsLists] = React.useState(false);



  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      localStorage.removeItem('sb-phijictojbnypvqnixkd-auth-token');
      window.location.href = '/';
      toast.success('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center md:flex-row flex-col">

      <NavLink to="/home" 
       onClick={() => { setIsHome(true), setIsLists(false) }}
       className="flex space-x-8 md:flex-row flex-col">
      
        <img className="h-12 w-12 mr-2" src="santa-claus.png" alt="" />
        <h1 className="text-3xl font-bold italic">Wishlist Manager</h1>
      </NavLink>




      <div className="flex items-center justify-center w-full md:w-auto md:order-first order-last">

        <ul className="flex items-center justify-center">

          <NavLink to={'/home'}>
            <li
              onClick={() => { setIsHome(true), setIsLists(false) }}
              className={`text-3xl font-bold cursor-pointer hover:color-gray-700 md:mr-8 ${isHome ? 'text-sky-400 underline' : ''}`}
            >
              Home

            </li>
          </NavLink>


          <NavLink to={'/lists'}>
            <li
              onClick={() => { setIsLists(true), setIsHome(false) }}
              className={`text-3xl font-bold cursor-pointer hover:color-blue-700 md:mr-8 ${isLists ? 'text-sky-400 underline' : ''}`}
            >

              Lists

            </li>
          </NavLink>

        </ul>

      </div>



      <ul className="flex space-x-4 md:flex-row flex-col md:mt-0 mt-4">
        <li className="italic">devanshpatil692@gmail.com</li>

        <li
          onClick={handleLogout}
          className="bg-gray-700 px-2 py-1 rounded-md cursor-pointer hover:bg-red-500 ">

          {loading ? 'Logging out...' : 'Logout'}

        </li>

      </ul>



    </div>
  )
}

export default Navbar;
