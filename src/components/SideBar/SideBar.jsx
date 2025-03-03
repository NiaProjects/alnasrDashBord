import React from 'react'
import nialogo from "../../assets/images/logonia.svg"
import { NavLink } from 'react-router-dom'
import { FaUserDoctor } from 'react-icons/fa6'
import { PiCardsFill } from 'react-icons/pi'
import { FaChartPie } from 'react-icons/fa'
export default function SideBar() {
  return <>
  
  
<div>
  <nav className="fixed top-0 z-50 w-full  border bg-gray-800 border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>
          <a href="#" className="flex ms-2 md:me-24">
            <img src={nialogo} className=" w-14 me-3" alt="NIA Logo" />
            {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">NIA</span> */}
          </a>
        </div>
        <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform -translate-x-full  border-r  sm:translate-x-0 bg-gray-800 border-gray-700" aria-label="Sidebar">
    <div className="h-full px-3 pb-4 overflow-y-auto py-4 bg-gray-800">
      <ul className="space-y-2 font-medium">
        <li>
          <NavLink  to={"/"} className="flex items-center p-2 transition-all   rounded-lg text-white hover:bg-gray-700 group">
          <FaChartPie />

            <span className="ms-3">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/docs"} className="flex items-center p-2 transition-all   rounded-lg text-white  hover:bg-gray-700  group">
          <FaUserDoctor />

            <span  className="flex-1 ms-3 whitespace-nowrap">Doctors</span>
            {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Specialization"} className="flex items-center p-2 transition-all   rounded-lg text-white  hover:bg-gray-700  group">
          <PiCardsFill />

            <span  className="flex-1 ms-3 whitespace-nowrap">Specialization</span>
            {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/offers"} className="flex items-center p-2 transition-all   rounded-lg text-white  hover:bg-gray-700  group">
          <PiCardsFill />

            <span  className="flex-1 ms-3 whitespace-nowrap">offers</span>
          </NavLink>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 transition-all   rounded-lg text-white  hover:bg-gray-700  group">
            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
          </a>
        </li>

        <li>
          <a href="#" className="flex items-center p-2 transition-all  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
          </a>
        </li>

      </ul>
    </div>
  </aside>
 
</div>


  
  </>
}
