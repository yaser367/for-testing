import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import UserName from "./components/user/UserName";
import Password from "./components/user/Password";
import ProfilePage from "./pages/user/Profile";
import Booking from "./pages/user/Booking";
import OneTurfView from "./pages/user/OneTurf";
import Register from "./components/user/Register";
import Otp from "./components/user/Otp";
import BookNowPage from "./pages/user/BookNow";
import Reset from "./components/user/Reset";
import TurfHome from "./pages/TurfAdmin/HomePage";
import Login from './components/TurfAdmin/Login'
import Profile from './pages/TurfAdmin/Profile'
import AddTurf from "./pages/TurfAdmin/AddTurfPage";
import OneTurf from "./pages/TurfAdmin/OneTurfView";

function App() {
  const [count, setCount] = useState(0);

  return (
      <Routes>
        {/* User Side */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserName />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/turf/:id" element={<OneTurfView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp/:userName" element={<Otp />} />
        <Route path="/book/:id" element={<BookNowPage />} />
        <Route path="/reset/:id" element={<Reset />} />

        {/* TurfAdmin Side */}
        <Route path="/turfAdmin/home" element={<TurfHome />} />
        <Route path="/turfAdmin/login" element={<Login />} />
        <Route path="/turfAdmin/profile" element={<Profile />} />
        <Route path="/turfAdmin/addTurf" element={<AddTurf />} />
        <Route path="/turfAdmin/turf/:id" element={<OneTurf />} />

      </Routes>
  );
}

export default App;
