import React, { useContext } from 'react'
import {  motion } from "motion/react";
import { Appcontext } from '../Context/Appcontext';
import { useNavigate } from 'react-router-dom';

const GEneratebtn = () => {
  const Navigate = useNavigate()

   const{user, setshowLogin } = useContext(Appcontext)
    const onClickHandler= ()=>{
      if(user){
        Navigate('/result')
      }else{
        setshowLogin(true)
      }
  
    }
  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    className='flex flex-col justify-center items-center  my-20 py-12'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-10'>See the magic . Try now</h1>
        <button className=" mt-3 px-10 py-3 sm:text-lg bg-zinc-800 rounded-full text-white text-center" onClick={onClickHandler}> <span className="text-[#f9c23c]"> Generate</span> Image✨</button>
    </motion.div>
  )
}

export default GEneratebtn