import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-2 laptop:px-10 py-6 h-20 bg-violet-200  text-purple-800 w-full">
      <div className="logo flex justify-between items-center">
        <div className="font-serif font-bold text-3xl cursor-pointer">
          <Link to="/">iNotes</Link>
        </div>

        <Link to="/addNotes">
          <div className="addNotes text-2xl font-bold flex gap-1  items-center">
            <IoMdAdd className="text-5xl " />
            <p className="hidden tablet:block">Add Note</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
