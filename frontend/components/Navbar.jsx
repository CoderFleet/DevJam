import { NavLink, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useAuthStore } from "../src/store/useAuthStore";

function Navbar() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  console.log("Auth User:", authUser);
  console.log(authUser.username);

  return (
    <div className="navbar bg-base-100">
      <div className="flex flex-row flex-1">
        <NavLink className="btn btn-ghost text-xl" to="/dashboard">
          Your Chats
        </NavLink>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-circle">
        <TbLogout className="size-6" />
      </button>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src={
                authUser?.avatar ||
                "https://avatarfiles.alphacoders.com/375/375542.png"
              }
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
