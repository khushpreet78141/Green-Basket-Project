
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [adminrole, setadminrole] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const handleAdmin = async()=>{
    if(user?.role==="admin"){
    setadminrole(adminrole=>!adminrole)
  }
  }
  

  const handleLogout = () => {
    const confirmed = window.confirm("are you sure , you want to Log Out!");
    if (confirmed) {
      dispatch(logOut());
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  }

  return (
    <>
      <nav className="w-full green text-white sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {/*<RxHamburgerMenu className="text-2xl md:hidden" />*/}

            <div className="flex items-center gap-1">
              <lord-icon
                src="https://cdn.lordicon.com/xazzumfu.json"
                trigger="hover"
                style={{ width: "40px", height: "40px" }}
              />
              <p className="font-semibold">
                Green<span className="text-orange-500 text-xl font-bold">𝕭</span>asket
              </p>
            </div>
          </div>

          {/* Center: Search (hidden on small screens) */}
          <div className="hidden md:block relative w-full max-w-md">
            <input
              type="text"
              value={searchBarValue}
              onChange={(e) => setSearchBarValue(e.target.value)}
              placeholder="Search here..."
              className="w-full bg-white text-green-900 px-4 py-2 rounded-full focus:outline-none"
            />
            <Link to="/searchbar" state={{ query: searchBarValue }} className="absolute right-3 top-2">
              <lord-icon
                src="https://cdn.lordicon.com/xaekjsls.json"
                trigger="hover"
                style={{ width: "24px", height: "24px" }}
              />
            </Link>
          </div>

          {/* Right: Offer + Cart */}
          <div className="flex items-center md:gap-3 gap-1">
            <span className="hidden lg:block text-sm">
              ⚡ Order now & get it in 15 min
            </span>

            <Link
              to="/cart"
              className="bg-white p-2 rounded-full cursor-pointer"
            >
              <lord-icon
                src="https://cdn.lordicon.com/njmquueq.json"
                trigger="hover"
                style={{ width: "26px", height: "26px" }}
              />

            </Link>
            <Link
              to="/yourOrders"
              className="bg-white md:p-2 rounded-full cursor-pointer"
            >
              <button className="textgreen text-[14px] md:text-[16px] cursor-pointer hidden md:block">
                orders
              </button>

            </Link>
            <Link to="/signUp" className="bg-white md:p-2 rounded-full hidden md:block">
              <button className="textgreen cursor-pointer text-[14px] md:text-[16px]">Sign Up</button>
            </Link>

            {token && <button className="textgreen cursor-pointer bg-white md:p-2 rounded-full text-[14px] md:text-[16px] hidden md:block" onClick={handleLogout}>Log Out</button>}
            <div>

            </div>
            {/* here for small screens */}

            <div className="text-black md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow cursor-pointer"
              >
                👤 {user?.fullName}
                <span className="text-sm">▼</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border z-50">

                  <Link
                    to="/yourOrders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    orders
                  </Link>

                  <Link
                    to="/signUp"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    signUp
                  </Link>

                  {/* Show only if admin */}
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                      onClick={() => setOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  {token && <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>}
                </div>
              )}</div>
              <div> <button
        
        className=" items-center gap-2 bg-white hidden  md:flex px-1 py-1 rounded-full shadow cursor-pointer textgreen"
      >
       <span className="text-[14px]"> 👤 {user?.fullName}</span>
       <span className="text-sm" onClick={handleAdmin}>▼</span>
       
      </button>
      </div>
          </div>
        </div>
      </nav>
     {adminrole && <div className="absolute right-20  bg-white border-2 z-50 p-2 rounded-xl "> <Link to="/admin" className="text-red-600 bg-white p-1 text-xl ">admin panel </Link></div>}
      <div className="belowsearchbar">

      </div>
      <div className="md:hidden block relative w-full max-w-md border-green-950 border rounded-3xl mt-2">
        <input
          type="text"
          value={searchBarValue}
          onChange={(e) => setSearchBarValue(e.target.value)}
          placeholder="Search here..."
          className="w-full bg-white text-green-900 px-4 py-2 rounded-full focus:outline-none"
        />
        <Link to="/searchbar" state={{ query: searchBarValue }} className="absolute right-3 top-2">
          <lord-icon
            src="https://cdn.lordicon.com/xaekjsls.json"
            trigger="hover"
            style={{ width: "24px", height: "24px" }}
          />
        </Link>

      </div>
    </>

  );
};

export default Navbar;
