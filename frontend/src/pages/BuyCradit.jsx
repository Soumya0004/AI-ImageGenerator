  import React, { useContext } from "react";
  import { assets, plans } from "../assets/assets";
  import { Appcontext } from "../Context/Appcontext";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  import toast from "react-hot-toast";
  import axios from "axios";
  import axiosInstance from '../Context/axiosInstance';

  const BuyCredit = () => {
    const { user, backendurl, loadCreaditsData, token, setshowLogin } = useContext(Appcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const initPay = async (order) => {
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded. Please refresh the page.");
        return;
      }
    
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
             const options = {
         key: razorpayKey,
         amount: order.amount,
         currency: order.currency,
         name: "Credits Payment",
         description: "Buy Credits",
         order_id: order.id,
                   // Test mode configuration
          notes: {
            "Test Mode": "This is a test payment"
          },
        handler: async (response) => {
          try {
            const { razorpay_order_id } = response;
    
            const { data } = await axiosInstance.post(
              '/api/user/verify-razor',
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
        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled by user");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#000000",
        },
      };
    
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    

    const paymentRazorpay = async (planId) => {
      try {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);
        
        if (!user) {
          setshowLogin(true);
          setLoading(false);
          return;
        }
        const { data } = await axiosInstance.post(
          '/api/user/pay-razor',
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
      } finally {
        setLoading(false);
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
                disabled={loading}
                className={`min-w-52 py-2 bg-black text-white rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Processing..." : (user ? "Purchase" : "Get started")}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  export default BuyCredit;
