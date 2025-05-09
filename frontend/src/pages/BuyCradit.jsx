import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { Appcontext } from "../Context/Appcontext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendurl, loadCreaditsData, token, setshowLogin } = useContext(Appcontext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Buy Credits",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { razorpay_order_id } = response;

          const { data } = await axios.post(
            backendurl + "/api/user/verifay-razor",
            { razorpay_order_id },
            {
              headers: { token },
            }
          );

          if (data.success) {
            loadCreaditsData();
            navigate("/");
            toast.success("Credits added successfully");
          } else {
            toast.error(data.message || "Payment failed");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setshowLogin(true);
        return;
      }

      const { data } = await axios.post(
        backendurl + "/api/user/pay-razor",
        { planId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Failed to create Razorpay order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-white px-10 py-2 rounded-full mb-6 text-white font-semibold">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-semibold mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center text-left gap-6">
        {plans.map((items, i) => (
          <div
            className="bg-white/20 drop-shadow-sm rounded-lg py-12 px-8 hover:scale-105 transition-all duration-500"
            key={i}
          >
            <img className="mb-5 h-7" src={assets.logo_icon} alt="" />
            <p className="mb-3 font-semibold">{items.id}</p>
            <p className="mb-5 text-sm">{items.desc}</p>
            <p className="mb-5">
              ₹ <span className="text-3xl">{items.price}</span> / {items.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(items.id)}
              className="min-w-52 py-2 bg-black text-white rounded-md w-full"
            >
              {user ? "Purchase" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
