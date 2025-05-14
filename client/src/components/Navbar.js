import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State Management
  const isLogin = useSelector((state) => state.isLogin) || !!localStorage.getItem("userId");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("userId");
      setIsMenuOpen(false);
      toast.success("Logged out successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again");
    }
  };

  const AuthButtons = () => (
    <div className="flex gap-4">
      {isLogin ? (
        <>
          <Link
            to="/create-blog"
            className="px-4 py-2 rounded-full font-medium hover-underline flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdCreate /> Create
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full font-medium hover-submit flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full font-medium hover-underline flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiLogIn /> Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full font-medium hover-submit flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiUserPlus /> Register
          </Link>
        </>
      )}
    </div>
  );

  const Links = () => (
    <div className="flex gap-6">
      <Link
        to="/home"
        className="hover-link"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/my-blogs"
        className="hover-link"
        onClick={() => setIsMenuOpen(false)}
      >
        My Blogs
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DevLog</h1>

        {/* Hamburger Menu */}
        <button
          className="text-richblack text-3xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Links & Auth Buttons */}
        <div className="md:flex gap-6 hidden">
          {isLogin && <Links />}
        </div>

        <div className="md:flex gap-4 hidden">
          <AuthButtons />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white md:hidden shadow-md">
          <div className="flex flex-col gap-4 px-4 py-4">
            {isLogin && <Links />}
            <AuthButtons />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
