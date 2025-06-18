import { FC } from "react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

interface DropdownProps {
  textColor?: string;
}

const UserDropdown: FC<DropdownProps> = ({ textColor }) => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className={`menu menu-md dropdown-content bg-base-100 ${
          textColor && textColor
        } rounded-box z-1 mt-3 w-52 p-2 shadow`}
      >
        <li>
          <Link to="my-learning" className="justify-between">
            My learning
          </Link>
        </li>
        <li>
          <Link to="/cart">My cart</Link>
        </li>
        <li>
          <Link to="/my-learning">Wishlists</Link>
        </li>
        <Separator />
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <Separator />
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <Separator />
        <li>
          <a className="text-red-500">Logout</a>
        </li>
        <Separator />
        <li>
          <a>Coursemedia Business</a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
