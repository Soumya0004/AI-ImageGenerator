import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import {  motion } from "motion/react";
import { Appcontext } from "../Context/Appcontext";

const Result = () => {
  const [image, setimage] = useState(assets.sample_img_1)
  const [imageLoded, setimageLoded] = useState(false)
  const [Loding, setLoding] = useState(false)
  const [input, setinput] = useState('')

  const {generateimg}=useContext(Appcontext)
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    setLoding(true)

    if (input) {
      const img = await generateimg(input)
      setimage(img)
      if(img){
        setimageLoded(true)
        setimage(img)

      }
    }
setLoding(false)
  }
  return (
    <motion.form
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onSubmit={onSubmitHandler} className=" flex flex-col min-h-[90vh] items-center justify-center">
    <div className="">
      <div className="relative">
         
      <img src={image} className='h-[23rem]' alt="" />
      <span className={`absolute bottom-0 left-0 h-1 bg-blue-500  ${Loding ? 'w-full transition-all duration-[10s] ': 'w-0'}`} />
     


        </div>
        <p className={!Loding ? 'hidden' : ''}>Loding.....</p>
    </div>
    {!imageLoded &&  <div className="flex w-full max-w-xl bg-neutral-500 text-sm p-0.5 mt-10 rounded-full">
      <input onChange={e => setinput(e.target.value)} value={input} type="text" placeholder="Describe what you want to generate" className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"/>
      <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white">Generate</button>
    </div> }
   
   {
    imageLoded && <div className="flex gap-2 flex-wrap justify-center items-center text-white text-sm p-0.5 mt-10 rounded-full">
    <p onClick={()=>setimageLoded(false)} className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer ">Generate Anathor</p>
    <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">Downlode</a>
  </div>
   }

    

    </motion.form>
  );
};

export default Result;
