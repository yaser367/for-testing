import React from "react";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import Profile from "../../components/user/Profile";

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <Profile />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
