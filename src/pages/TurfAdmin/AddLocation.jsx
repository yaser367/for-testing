import React from "react";
import Nav from "../../components/TurfAdmin/Nav";
import AddLocations from "../../components/Location/AddLocation";

const AddLocation = () => {
  return (
    <div className="bg-white min-h-[900px]">
      <Nav />
      <AddLocations />
    </div>
  );
};

export default AddLocation;
