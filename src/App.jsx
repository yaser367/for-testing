import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import UserName from "./components/user/UserName";
function App() {
  const [count, setCount] = useState(0);

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={ <Home/>}/>
    <Route path="/login" element={ <UserName/>}/>
  </Routes>
  </BrowserRouter>;

}

export default App;
