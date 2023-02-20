import React, { useState } from "react";
import Nav from "../../components/TurfAdmin/Nav";
import Oneturf from "../../components/TurfAdmin/Oneturf";
import Modal from "../../components/TurfAdmin/Modal";

const OneTurfView = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="bg-white">
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <Nav
        setShowModal={setShowModal}
        showModal={showModal}
        openModal={openModal}
      />
      <Oneturf />
    </div>
  );
};

export default OneTurfView;
