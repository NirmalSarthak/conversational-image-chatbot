import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";   // ✅ ADD THIS
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Contact from "./pages/Contact";




function Login() {
  return <h2 style={{ padding: "20px" }}>Login Page</h2>;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* ✅ ADD FOOTER HERE */}
      <Footer />
    </>
  );
}