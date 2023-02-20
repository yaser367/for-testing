import React, { useState } from "react";
import Home from "../../components/TurfAdmin/Home";
import Nav from "../../components/TurfAdmin/Nav";

const TurfHome = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="bg-white">
      {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}
      <div>
        <Nav
          setShowModal={setShowModal}
          showModal={showModal}
          openModal={openModal}
        />

        <Home />
      </div>
    </div>
  );
};

export default TurfHome;
