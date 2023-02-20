import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import UserName from "./components/user/UserName";
import Password from "./components/user/Password";
import ProfilePage from "./pages/user/Profile";
import Booking from "./pages/user/Booking";
import OneTurfView from "./pages/user/OneTurf";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
