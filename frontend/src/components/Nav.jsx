import React, { useContext }  from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Appcontext } from "../Context/Appcontext";
const Nav = () => {

  const {user ,setshowLogin,logOut,credit}=useContext(Appcontext)
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-4 items-center ">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32  lg:w-40  " />
      </Link>

      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6  py-1.5 sm:py-3 rounded-full hover:scale-105 transation-all duration-700"
           onClick={() => {
            navigate("/buy");}}>
            <img
              className=" w-5
            "
              src={assets.credit_star}
              alt=""
            />
            <p className="text-gray-600 text-xs sm:text-sm font-semibold ">
              Credits left : {credit}
            </p>
          </button>
          <p className="text-white max-sm:hidden pl-4">Hi, {user.name}</p>
          <div className=" relative group">
            <img
              src={assets.profile_icon}
              className="w-10 drop-shadow"
              alt=""
            />
            <div className=" absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm
              ">
                <li onClick={logOut} className=" py-1 px-2 cursor-pointer ">Logout</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-semibold flex gap-4 sm:gap-5 items-center ">
          {" "}
          <p
            onClick={() => {
              navigate("/buy");
            }}
            className=" cursor-pointer text-white"
          >
            Pricing
          </p>
          <Link onClick={()=>{setshowLogin(true )}}  className="rounded-full px-10 py-2 bg-[#5164d2] text-white ">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
