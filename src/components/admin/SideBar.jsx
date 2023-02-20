import React from "react";
import "../../style/Sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Turf Play Admin</span>
      </div>
      <hr />
      <div className="center ">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/admin/dashboard">
            <li className="flex">
              <MdDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="controls">CONTROLS</p>
          <Link to="/admin/users">
            {" "}
            <li className="flex">
              <FaUsers className="icon" />
              <span>User</span>
            </li>
          </Link>
          <Link to="/admin/TurfAdminmng">
            <li className="flex">
              <MdAdminPanelSettings className="icon" />
              <span>Turf Admins</span>
            </li>
          </Link>
          <Link to="/admin/requests">
            <li className="flex">
              <BsBorderStyle className="icon" />
              <span>Requests</span>
            </li>
          </Link>
          <li onClick={handleLogOut} className="flex ">
            <RiLogoutBoxFill className="icon" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
