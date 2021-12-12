import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
const Navbar = () => {
  let location = useLocation();
   const context = useContext(noteContext);
   const {darkTheme,setdarkTheme,showalert} = context
  
 let changeTheme = ()=>{
   setdarkTheme(!darkTheme);
   localStorage.usertheme = `${!darkTheme}`;
 }

  return (
    <div>
       <div>
      <header>
        <nav
          className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-gray-200
          dark:bg-gray-800
          dark:text-white
        "
        >
          <div>
            <Link to="/">Mydairies</Link>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            onClick={()=>{ document.getElementById('menu').classList.toggle('hidden');}}
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div
            className="hidden w-full md:flex md:items-center md:w-auto"
            id="menu"
          >
            <ul
              className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
            >
              <li>
                <Link className={`md:p-4 dark:text-white py-2 block hover:text-purple-400 ${location.pathname === "/"
                  ? "text-gray-900 font-bold dark:text-gray-100"
                  : "dark:text:gray-400"
                } `} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={`md:p-4 py-2 block dark:text-white hover:text-purple-400 ${location.pathname === "/about"
                  ? "text-gray-900 font-bold dark:text-gray-100"
                  : "dark:text:gray-400"
                } `} to="/about">
                  About{" "}
                </Link>
              </li>
              <li>
              {!localStorage.getItem('token') &&
                <Link
                  className={`md:p-4 py-2 block dark:text-white hover:text-purple-400 text-purple-500 ${location.pathname === "/signup"
                  ? "text-gray-900 font-bold dark:text-gray-100"
                  : "dark:text:gray-400"
                } `}
                  to="/signup"
                >
                  Sign Up
                </Link> }
              </li>
              <li>
              {!localStorage.getItem('token') &&
                <Link
                  className={`md:p-4 py-2 block dark:text-white hover:text-purple-400 text-purple-500 ${location.pathname === "/login"
                  ? "text-gray-900 font-bold dark:text-gray-100"
                  : "dark:text:gray-400"
                } `}
                  to="/login"
                >
                  Login
                </Link>}
              {localStorage.getItem('token') &&
                <button
                  className={`md:p-4 py-2 block dark:text-white hover:text-purple-400 text-gray-900 ${location.pathname === "/login"
                  ? "text-gray-900 font-bold dark:text-gray-100"
                  : "dark:text:gray-400"
                } `}
                  onClick={()=>{localStorage.removeItem('token');
                  window.location.reload();
                  showalert('Success',"logged Out")}}>
                  LogOut
                </button>}

              </li>
              <li>
                <button className="md:p-4 py-2 block dark:text-white hover:text-purple-400 text-gray-900" onClick={changeTheme}>
                  {darkTheme ===true ? 'Light' : 'Dark'}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>

    </div>
  );
};

export default Navbar;
