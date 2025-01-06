import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <Link
            href="/about"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200"
          >
            <span>ℹ️</span> About
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-200"
          >
            <span>👤</span> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
