import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaBox, FaShoppingCart, FaCog } from "react-icons/fa";

function Sidebar() {
  const closeDrawer = () => {
    const drawer = document.getElementById("main-drawer");
    if (drawer) drawer.checked = false;
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 
     hover:bg-primary/10 hover:text-primary 
     focus:bg-primary/10 focus:text-primary focus:outline-none
     ${isActive ? "bg-primary text-primary-content font-semibold" : ""}`;

  return (
    <div className="drawer-side">
      <label htmlFor="main-drawer" className="drawer-overlay"></label>

      <ul className="menu p-5 w-64 min-h-full bg-base-200 text-base-content border-r border-base-300">
        <Link
          to={"/"}
          className="text-2xl font-bold mb-8 text-primary tracking-wide"
        >
          Admin Panel
        </Link>

        <li>
          <NavLink to="/" className={linkClass} onClick={closeDrawer}>
            <FaHome className="text-lg" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/users" className={linkClass} onClick={closeDrawer}>
            <FaUsers className="text-lg" />
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/products" className={linkClass} onClick={closeDrawer}>
            <FaBox className="text-lg" />
            <span>Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={linkClass} onClick={closeDrawer}>
            <FaShoppingCart className="text-lg" />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className={linkClass} onClick={closeDrawer}>
            <FaCog className="text-lg" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
