
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  

  return (
    <nav className="w-full green text-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">

        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <RxHamburgerMenu className="text-2xl md:hidden" />

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
            placeholder="Search groceries..."
            className="w-full bg-white text-green-900 px-4 py-2 rounded-full focus:outline-none"
          />
          <Link to="/searchbar" state={{query:searchBarValue}} className="absolute right-3 top-2">
            <lord-icon
              src="https://cdn.lordicon.com/xaekjsls.json"
              trigger="hover"
              style={{ width: "24px", height: "24px" }}
            />
          </Link>
        </div>

        {/* Right: Offer + Cart */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:block text-sm">
            ⚡ Order now & get it in 15 min
          </span>

          <Link
            to="/cart"
            className="bg-white p-2 rounded-full"
          >
            <lord-icon
              src="https://cdn.lordicon.com/njmquueq.json"
              trigger="hover"
              style={{ width: "26px", height: "26px" }}
            />
            
          </Link>
           <Link
            to="/yourOrders"
            className="bg-white md:p-2 rounded-full"
          >
            <button className="textgreen">
              your orders
            </button>
            
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
