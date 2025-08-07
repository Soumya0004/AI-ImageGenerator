import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Appcontext } from "../Context/Appcontext";
import {  motion } from "motion/react";
import axiosInstance from '../Context/axiosInstance';
import toast from "react-hot-toast";

const Login = () => {
  const [state, setstate] = useState("Login");
  const {setshowLogin,backendurl,settoken,setuser}=useContext(Appcontext)

 const [name, setname] = useState('')
 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')


 const onSubmitHandler= async(e)=>{
    e.preventDefault()
    try {

      if (state === "Login") {
        const {data}=await  axiosInstance.post('/api/user/login', {email,password})
        if (data.success) {
          settoken(data.token) 
          setuser(data.user)
          localStorage.setItem('token',data.token)
          setshowLogin(false)
        }else{
          toast.error(data.message)
          
        }
      }else{
        const {data}=await  axiosInstance.post('/api/user/register', {name,email,password})
        if (data.success) {
          settoken(data.token) 
          setuser(data.user)
          localStorage.setItem('token',data.token)
          setshowLogin(false)
        }else{
          toast.error(data.message)
          
        }
      }

    } catch (error) {
      toast.error(error.message)

    }
 }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="  fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form  onSubmit={onSubmitHandler}
       initial={{ opacity: 0.2, y: 50 }}
       transition={{ duration: 0.3 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
      className=" relative bg-white p-14 rounded-xl">
        <h1 className="text-center text-2xl text-neutral-700 font-semibold">
          {state}
        </h1>
        <p className="text-sm text-center mt-2">
          Welcome back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="" className="h-5" />

            <input
            onChange={(e) => setname(e.target.value)}
            value={name}
              type="text"
              placeholder="Full Name"
              required
              className=" outline-none text-sm "
            />
          </div>
        )}
        <div className="border  px-6 py-2 flex items-center gap-2 rounded-full mt-4 ">
          <img src={assets.email_icon} alt="" className="h-3" />

          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email ID"
            required
            className=" outline-none text-sm "
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="h-3" />

          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className=" outline-none text-sm "
          />
        </div>
        <p className=" text-sm to-blue-600 my-4 cursor-pointer">
          Forget password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {" "}
          {state === "Login" ? "Login" : "Create account"}{" "}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account ?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setstate("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account ?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setstate("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img onClick={()=>setshowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className=" absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
