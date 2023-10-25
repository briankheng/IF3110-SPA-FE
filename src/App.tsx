import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import './App.css'

// pages
import Login from "./pages/Login/login";

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

        {/* Other Pages */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
