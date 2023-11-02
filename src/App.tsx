import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import './App.css'

// pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import RedeemToken from "./pages/RedeemToken/RedeemToken";

function App() {
  return (
    <BrowserRouter>
      {/* <h1 className="h-96 text-5xl">WELCOME TO KBL - REACT TS VER.</h1> */}
      <Routes>
        {/* Example */}
        <Route path="/" element={<Login />} />

        {/* Pages */}

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Other Pages */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
