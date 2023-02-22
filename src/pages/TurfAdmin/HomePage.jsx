import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../../components/TurfAdmin/Home";
import Nav from "../../components/TurfAdmin/Nav";
import { selectCurrectToken } from "../../features/auth/authSlice";

const TurfHome = () => {
  const [showModal, setShowModal] = useState(false);
  const token = useSelector(selectCurrectToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/turfAdmin/login");
    }
  }, []);
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
