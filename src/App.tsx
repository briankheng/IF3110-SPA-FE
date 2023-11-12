import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// styles
import "./App.css";

// pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import RedeemToken from "./pages/RedeemToken/RedeemToken";
import AlbumDetail from "./pages/AlbumDetail";
import Home from "./pages/Home";
import Album from "./pages/Album";

function App() {
  return (
    // Notes: Nanti dibuat folder routes terpisah..
    <Router>
      <h1> KBL-SPA CEK CEKKK </h1>
      <Link to="/">Home</Link>
      <Link to="/album">Album</Link>
      <Link to="/detail">Detail</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/album" element={<Album />} />
        <Route path="/detail" element={<AlbumDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
