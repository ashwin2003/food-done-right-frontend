import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[10vh] bg-color3 flex flex-row items-center justify-between p-4 ">
      <div className="flex flex-row items-end gap-2 ">
        <p className=" font-bold  text-3xl text-color1 ">Food Done Right</p>
        <p className=" font-medium text-lg  text-color1">By Ashwin Jagarwal</p>
      </div>

      <div>
        <Link to={"/"} className=" font-medium text-color1 text-lg ">
          Search Outlet
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
