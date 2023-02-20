import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Requests from "../../components/admin/Requests";
import Sidebar from "../../components/admin/Sidebar";
import "./Dashboard.scss";

const RequestsPage = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="bg-white flex">
      <Sidebar />
      <div style={{ flex: "6" }} className="p-5">
        <p className="font-bold text-2xl text-gray-700 ml-4">Requests</p>
        <Requests />
      </div>
    </div>
  );
};

export default RequestsPage;
