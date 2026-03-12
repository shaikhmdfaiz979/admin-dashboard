import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import { PiMoon,PiSun} from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-10">
      <div className="flex-none lg:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <HiOutlineMenuAlt3 size={30} className="text-primary"/>
        </label>
      </div>

      <Link to='/' className="flex-1 -my-12 -mt-10">
       <img src="./logo.png" alt="Fz979"className="w-50 object-contain "/>
      </Link>

      <div className="flex-none">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="btn btn-ghost btn-circle"
        >
          {theme === "light" ? <PiMoon className='text-primary' size={25}/> : <PiSun className='text-primary' size={25}/>}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
