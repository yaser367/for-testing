import React from "react";
import Navbar from "../components/user/Navbar";
import Hero from "../components/user/Hero";
import Footer from "../components/user/Footer";
import MapComponent from "../components/user/MapComponent";
import ThirdComponent from "../components/user/ThirdComponent";
import "./home.module.css";

const Home = () => {
  return (
    <div className="home w-full">
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="">
        <Hero />
      </div>
      <MapComponent />
      <ThirdComponent />
      <Footer />
    </div>
  );
};

export default Home;