import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../config/supabase'
import { toast } from 'react-toastify'
import Icon from '../img/santa-claus.png';
import { useLocation } from 'react-router-dom';



const Navbar = () => {

  const [loading, setLoading] = useState(false);
  const [isHome, setIsHome] = React.useState(false);
  const [isLists, setIsLists] = React.useState(true);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

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

  const fetchProfile = async () => {

    try {
      const { data: { user } } = await supabase.auth.getUser();
      setProfile(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  


  React.useEffect(() => {


    setIsHome(location.pathname === '/home');
    setIsLists(location.pathname === '/lists');

    fetchProfile();
  }, [location.pathname]);
  


  return (
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between md:flex-row flex-col md:space-x-4 space-x-0">

      <NavLink to="/lists" 
       onClick={() => { setIsHome(false), setIsLists(true) }}
       className="flex md:flex-row flex-col space-x-1 md:order-first order-last">

        <img className="h-12 w-12 mr-2 flex items-center justify-center"  src={Icon} alt="img" />
      
        <h1 className="text-3xl font-bold italic  flex items-center justify-center">Wishlist Manager</h1>
      </NavLink>




      <div className="flex items-center justify-center w-full md:w-auto md:order-first order-last">

        <ul className="flex items-center justify-center space-x-4 md:flex-row flex-col">

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



      <ul className="flex items-center justify-center space-x-4  md:flex-row flex-col md:mt-0 mt-4">
        <li className="italic">{profile?.email}</li>

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
