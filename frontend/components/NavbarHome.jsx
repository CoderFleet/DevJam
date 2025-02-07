import { useState } from "react";
import { FaSearch, FaBars, FaArrowRight, FaRightToBracket } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Top navbar */}
      <nav className="navbar justify-between gap-4 bg-base-300 p-4">
        {/* Logo */}
        <a className="btn btn-ghost text-lg flex items-center gap-2">
          <img alt="Logo" src="/logo.svg" className="w-4" />
          Company
        </a>

        {/* Search (Desktop) */}
        <div className="join w-full max-w-xl hidden sm:flex">
          <select className="select select-sm select-bordered join-item">
            <option selected>Good potions</option>
            <option>Bad potions</option>
            <option>Illegal potions</option>
          </select>
          <input className="join-item input input-sm input-bordered w-full" type="text" placeholder="Search" />
          <button className="join-item btn btn-sm btn-primary text-success-content">
            <FaSearch />
          </button>
        </div>

        {/* Menu (Desktop) */}
        <div className="shrink-0 hidden md:flex gap-2">
          <a className="btn btn-sm btn-ghost">Create Account</a>
          <a className="btn btn-sm btn-primary flex items-center gap-1">
            Log in
            <FaRightToBracket />
          </a>
        </div>

        {/* Menu (Mobile) */}
        <div className="md:hidden relative">
          <button className="btn btn-ghost" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <FaBars className="text-lg" />
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 dropdown-content menu z-10 bg-base-200 p-4 rounded-box shadow w-56 gap-2">
              <li><a>Create Account</a></li>
              <a className="btn btn-primary btn-sm flex items-center gap-1">
                Log in
                <FaArrowRight />
              </a>
            </ul>
          )}
        </div>
      </nav>

      {/* Bottom navbar (mobile only) */}
      <nav className="navbar sm:hidden bg-base-200 border-neutral p-4">
        <div className="join w-full">
          <select className="select select-sm select-bordered join-item">
            <option selected>Good potions</option>
            <option>Bad potions</option>
            <option>Illegal potions</option>
          </select>
          <input className="join-item input input-sm input-bordered w-full" type="text" placeholder="Search" />
          <button className="join-item btn btn-sm btn-primary text-success-content">
            <FaSearch />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
