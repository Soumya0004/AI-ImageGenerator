import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transationModel from "../models/transation.model.js";
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user= await newUser.save();


        const token=jwt.sign({id: user._id},process.env.JWT_SECRET);
        console.log("Generated token with ID:", token);


        res.json({success:true,user:{name:user.name},token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        
    }
} 




const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token=jwt.sign({id: user._id},process.env.JWT_SECRET);
            console.log("Generated token with ID:", token);


        res.json({success:true,user:{name:user.name},token});

          
        }else{
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


const userCredits = async (req, res) => {
    try {
        const {userId}  =req.body

        const user = await userModel.findById(userId)
       res.json({success:true,credits: user.creditBalance ,user:{name:user.name}})         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
        
    }
}


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

 // PAYMENT CREATION CONTROLLER
const paymentRazorpay = async (req, res) => {
    try {
      const { userId, planId } = req.body;
  
      if (!userId || !planId) {
        return res.status(400).json({ message: "Missing userId or planId" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let credits, plan, amount;
  
      switch (planId) {
        case 'Basic':
          plan = 'Basic';
          credits = 100;
          amount = 10;
          break;
        case 'Advanced':
          plan = 'Advanced';
          credits = 500;
          amount = 50;
          break;
        case 'Business':
          plan = 'Business';
          credits = 5000;
          amount = 250;
          break;
        default:
          return res.status(400).json({ message: "Invalid plan" });
      }
  
      const newTransaction = await transationModel.create({
        userId,
        plan,
        credits,
        amount,
        date: Date.now(),
        payment: false
      });
  
      const options = {
        amount: amount * 100, // in paise
        currency: process.env.CURRENCY || "INR",
        receipt: newTransaction._id.toString()
      };
  
      razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res.json({ success: true, order });
      });
  
    } catch (error) {
      console.error("Payment creation error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // PAYMENT VERIFICATION CONTROLLER
  const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
  
      if (!razorpay_order_id) {
        return res.status(400).json({ message: "Razorpay order ID is required" });
      }
  
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
      if (!orderInfo) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      if (orderInfo.status === "paid") {
        const transationData = await transationModel.findById(orderInfo.receipt);
  
        if (!transationData) {
          return res.status(404).json({ message: "Transaction not found" });
        }
  
        if (transationData.payment) {
          return res.status(400).json({ message: "Payment already made" });
        }
  
        const userData = await userModel.findById(transationData.userId);
  
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const creditBalance = userData.creditBalance + transationData.credits;
  
        await userModel.findByIdAndUpdate(userData._id, { creditBalance });
        await transationModel.findByIdAndUpdate(transationData._id, { payment: true });
  
        return res.json({
          success: true,
          credits: creditBalance,
          message: "Credits added successfully"
        });
      } else {
        return res.json({ success: false, message: "Payment not completed" });
      }
  
    } catch (error) {
      console.error("Verification error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
export   {loginUser,registerUser ,userCredits,paymentRazorpay,verifyRazorpay}