import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineChatAlt,
  HiOutlineLogout,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <div className="mt-20 w-64 bg-base-200 h-screen p-4 shadow-lg">
      <ul className="menu space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center gap-2">
            <HiOutlineViewGrid /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/assignments" className="flex items-center gap-2">
            <HiOutlineClipboardList /> Assignments
          </Link>
        </li>
        <li>
          <Link to="/heatmap" className="flex items-center gap-2">
            <HiOutlineChartBar /> Heatmap
          </Link>
        </li>
        <li>
          <Link to="/chats" className="flex items-center gap-2">
            <HiOutlineChatAlt /> Chats
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2">
            <HiUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/logout" className="flex items-center gap-2">
            <HiOutlineLogout /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
