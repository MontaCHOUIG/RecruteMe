import React from "react";
import { assets } from "../assets/assets";
import { SignIn, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img src={assets.logo} alt="" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Appiled Jobs</Link>
            <p>|</p>
            <p>welcome , {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button className="text-grey-600">Recruter login</button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
