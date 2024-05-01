"use client"



import React, { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { BsGraphUp, BsBag, BsPerson, BsGear, BsInbox, BsPower } from "react-icons/bs";

const  Sidebarmob = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" z-10">

      <button className=" " onClick={toggleSidebar}>
        {isOpen ? (
          <IoMdClose className="h-8 w-8 stroke-current text-gray-800" />
        ) : (
          <IoMdMenu className="h-8 w-8 stroke-current text-gray-800" />
        )}
      </button>
      <div className={`h-screen overflow-y-scroll w-64 bg-gray-800 text-white fixed top-0 left-0 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center">
          <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
          <h5 className="text-blue-gray ml-2">Sidebar</h5>
          <button className="" onClick={toggleSidebar}>
          <IoMdClose className="h-8 w-8 stroke-current  text-white" />
          </button>
          
        </div>
        <div className="p-2">
          <input type="text" placeholder="Search" className="bg-gray-700 text-white px-4 py-2 w-full rounded-md focus:outline-none" />
        </div>
        <div className="">
        <ul className="space-y-2">
          <li>
            <div className="flex items-center cursor-pointer">
              <BsGraphUp className="h-5 w-5" />
              <h6 className="ml-2">Dashboard</h6>
            </div>
            <ul className="pl-4 space-y-2">
              <li>Analytics</li>
              <li>Reporting</li>
              <li>Projects</li>
            </ul>
          </li>
          <li>
            <div className="flex items-center cursor-pointer">
              <BsBag className="h-5 w-5" />
              <h6 className="ml-2">E-Commerce</h6>
            </div>
            <ul className="pl-4 space-y-2">
              <li>Orders</li>
              <li>Products</li>
            </ul>
          </li>
          <li>
            <div className="flex items-center">
              <BsInbox className="h-5 w-5" />
              <h6 className="ml-2">Inbox</h6>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <BsPerson className="h-5 w-5" />
              <h6 className="ml-2">Profile</h6>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <BsGear className="h-5 w-5" />
              <h6 className="ml-2">Settings</h6>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <BsPower className="h-5 w-5" />
              <h6 className="ml-2">Log Out</h6>
            </div>
          </li>
        </ul>
        </div>
        
      </div>
    </div>
    
    
  );
};

export default Sidebarmob;

