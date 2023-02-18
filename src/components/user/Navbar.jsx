import React, { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setnav] = useState(true);
  const [select, setSelect] = useState(false);
  const handleNav = () => {
    setnav(!nav);
  };
  const navigate = useNavigate();
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div className="bg-black ">
      <div className="bg-black flex justify-between w-full max-w-[1240px] mx-auto px-3 items-center h-16 text-white relative">
        <img className="w-[100px] pt-4 " src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png' alt="" />
        <ul className="hidden md:flex">
          <Link to="/">
            <li className="pt-7 pl-6 cursor-pointer">Home</li>
          </Link>
          <Link to="/booking">
            <li className="pt-7 pl-6 cursor-pointer">Sevices</li>
          </Link>
          <Link to="/profile">
            <li className="pt-7 pl-6 cursor-pointer">Profile</li>
          </Link>
          <li className="pt-7 pl-6 cursor-pointer">About</li>
          <li className="pt-7 pl-6 cursor-pointer" onClick={userLogout}>
            Logout
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <AiOutlineCloseSquare size={32} />
          ) : (
            <CgMenuGridO size={32} />
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
            <Link to="/">
              <li className="p-4 border-b border-gray-600">Home</li>
            </Link>
            <Link to="/booking">
              <li className="p-4 border-b border-gray-600">Sevices</li>
            </Link>
            <Link to="/profile">
              <li className="p-4 border-b border-gray-600">Profile</li>
            </Link>
            <Link to="/">
              <li className="p-4 border-b border-gray-600">About</li>
            </Link>
            <li className="p-4" onClick={userLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
