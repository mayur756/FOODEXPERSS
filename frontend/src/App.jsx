import Header from "../src/Components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from './pages/Menu';
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Placeorder from "./pages/Placeorder";
import Order from "./pages/Order";
import Verfiy from "./pages/Verfiy";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <main>
      <Header />

      {/* Toast container at the root */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verify" element={<Verfiy />} />
      </Routes>
    </main>
  );
}
