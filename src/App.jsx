import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import SingleProduct from "./components/singleProduct/SingleProduct";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./pages/ScrollToTop";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <Navbar />
          <ScrollToTop />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>

        <Sidebar />
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
