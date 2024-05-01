"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"; // Correct import
import { auth } from "../../app/firebase/firebaseapp"
import { signOut } from "next-auth/react"
import { TiUserOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa"; // Import search icon from react-icons/fa
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Sidebar from './Sidebarmob';

const TaskBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Router hook
  let timeoutId;
  const { data: session, status } = useSession();
  
  console.log(isMobile)

  const handleMouseEnter = (e) => {
    e.preventDefault(); 
    clearTimeout(timeoutId); // Clear any existing timeout
    if (status === 'authenticated') { // Check if the user is authenticated
      setIsOpen(true);
    }
  };

  const signout = async () => {
    await signOut(auth).then(() => {
      alert("LOGOUT");
    })
  };
  

  const handleMouseLeave = (e) => {
    e.preventDefault(); 
    // Set a timeout to close the dropdown after 500 milliseconds
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  const toggleprofile = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    
  };

  return (
    <div className="bg-white w-full">
      {/* Desktop view */}
      <div className="hidden sm:flex items-center py-3 justify-between ">
     
      
        <div className='flex justify-center items-center '>  
        <Sidebar></Sidebar>
          <h1 className='ml-10'>LOGO</h1>
          
          
        </div>
        
        <div className='mx-3.5 w-3/6 ml-24 relative'>
          <input 
            className='ml-10 w-full h-8 bg-gray-200 text-black px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-8' 
            placeholder="Search 'use client'"
          />
          <FaSearch className="absolute left-2 top-2 text-gray-600" />
        </div>
        <div className='relative mr-4' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {status === "loading" ? (
  // Display a loading indicator or placeholder
  <div></div>
) : status === "authenticated" ? (
  // Display the user icon if authenticated
  <TiUserOutline
    style={{
      color: "#080808",
    }}
    size={32} 
    className='ml-10 hover:text-gray-700 cursor-pointer'
  />
) : (
  // Display a login button if not authenticated
  <button
    type="button"
    className="  z-0 inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    onClick={() => router.push("/Sign-in")} // Navigate to the sign-in route using the router
  >
    Login
  </button>
)}
          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-300"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-1" role="none">
                {/* Dropdown options */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Login Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Login Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => signOut()}
                >
                  LOGOUT
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="z-0 sm:hidden flex flex-col bg-white">
        <div className="flex items-center py-3 justify-between">
          <div className=' flex-col'>
          <a href="#" className="font-semibold ml-5" onClick={(e) => { 
        e.preventDefault(); 
        alert("Logo clicked");
      }}>
        Logo
      </a>
         
          </div>
       
          <div className='relative mr-5'  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {status === "loading" ? (
  // Display a loading indicator or placeholder
  <div></div>
) : (
  // Conditional rendering based on authentication status
  <>
    {status === "authenticated" ? (
      // Display the user icon if authenticated
      <TiUserOutline
        style={{
          color: "#080808",
        }}
        size={32} 
        className='ml-10 hover:text-gray-700 cursor-pointer'
        onClick={()=>{
         
          toggleprofile()
        }}
      />
    ) : (
      // Display a login button if not authenticated
      <button
        type="button"
        className="inline-flex mr-5 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => router.push("/Sign-in")} // Navigate to the sign-in route using the router
      >
        Login
      </button>
    )}
    {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-300"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-1" role="none">
                {/* Dropdown options */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Login Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Login Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => signOut()}
                >
                  LOGOUT
                </a>
              </div>
            </div>
          )}
  </>
)}

           
          </div>
        </div>
        <div className="flex items-center py-4 space-x-4 w-full">
        <Sidebar></Sidebar>
          <div className="relative">
            <input
              type="text"
              placeholder="Search 'use client'"
              className="bg-gray-200 text-black px-3 py-1 z-0 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full pl-8"
            />
            <FaSearch className="absolute left-2 top-2 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
