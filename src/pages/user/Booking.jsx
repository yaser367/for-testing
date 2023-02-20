import React from "react";
import Navbar from "../../components/user/Navbar";
import Carousal from "../../components/user/Carousal";
import Book from "../../components/user/Booking";
import Footer from "../../components/user/Footer";

const Booking = () => {
  const slides = ['https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/Rectangle_45_bkepcq.png', 'https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697348/Group_20_xuqqib.png'];
  return (
    <>
      <Navbar />
      <Carousal slides={slides} />
      <Book />
      <Footer />
    </>
  );
};

export default Booking;
