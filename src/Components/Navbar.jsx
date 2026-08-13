import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <h3 className="text-2xl font-bold text-blue-600 cursor-pointer">
          LOGO
        </h3>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <Link
            to="/home"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/new"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Add Task
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;