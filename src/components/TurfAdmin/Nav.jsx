import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const Nav = ({ setShowModal, showModal, openModal }) => {
  const [nav, setnav] = useState(true);

  const handleNav = () => {
    setnav(!nav);
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function userLogout() {
    dispatch(logOut());
    navigate("/turfAdmin/login");
  }
  return (
    <div className=" w-full">
      <div className="  flex justify-between max-w-[1240px] mx-auto px-3 items-center  text-white">
        <img className="w-[100px] pt-4 " src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png' alt="" />
        <ul className="hidden md:flex">
          <Link to='/turfAdmin/home'><li className="pt-2 pl-6 cursor-pointer font-bold text-black">
            Home
          </li></Link>
          <Link to='/turfAdmin/profile'><li className="pt-2 pl-6 cursor-pointer font-bold text-black">
            Profile
          </li></Link>
          <li
            className="text-black pt-2 pl-6 cursor-pointer font-bold"
            onClick={userLogout}
          >
            Logout
          </li>
          <li className=" pl-6 cursor-pointer font-bold">
            <Link to="/turfAdmin/addTurf">
              <button
                type="button"
                class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Add Turf
              </button>
            </Link>
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden cursor-pointer  ">
          {!nav ? (
            <AiOutlineCloseSquare size={32} className="text-black" />
          ) : (
            <CgMenuGridO size={32} className="text-black" />
          )}
        </div>
        <div
          className={
            !nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r boder-r-grey-900 bg-[#070707] ease-in-out duration-500 block md:hidden cursor-pointer"
              : "fixed left-[100%] "
          }
        >
          <img className="w-[100px] m-4 " src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png' alt="" />

          <ul className="p-4 uppercase ">
            <li className="p-4 border-b border-gray-600">Home</li>
            <li className="p-4 border-b border-gray-600">Profile</li>

            <li className="p-4 border-b border-gray-600">Logout</li>
            <li className="p-4 border-b border-gray-600">
              <button
                onClick={openModal}
                type="button"
                class="mr-8 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Add Turf
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
