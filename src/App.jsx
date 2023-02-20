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

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserName />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/turf/:id" element={<OneTurfView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp/:userName" element={<Otp />} />
        {/* <Route path="/book/:id" element={<BookNowPage />} /> */}
        {/* <Route path="/reset/:id" element={<Reset />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
