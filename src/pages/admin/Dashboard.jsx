import React, { useEffect } from "react";
import "./Dashboard.scss";
import Sidebar from "../../components/admin/Sidebar";
import Widget from "../../components/admin/Widget";
import Featured from "../../components/admin/Featured";
import Chart from "../../components/admin/Chart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="dash">
      <Sidebar />
      <div className="bg-white homeContainer">
        <div className="widgets">
          <Widget type="User" />
          <Widget type="TurfAdmin" />
          <Widget type="Order" />
          <Widget type="earning" />
        </div>
        <div className="charts flex pt-3 pl-8 gap-8">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
