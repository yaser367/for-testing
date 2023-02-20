import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import TurfDetails from "../../components/admin/TurfDetails";

const RequestTurfDetails = () => {
  return (
    <div className="bg-white flex">
      <Sidebar />
      <div style={{ flex: "6" }} className="p-5">
        <TurfDetails />
      </div>
    </div>
  );
};

export default RequestTurfDetails;
