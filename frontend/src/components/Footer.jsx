import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
         <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32  lg:w-30  " />
      </Link>
        <p className='flex-1 border-l border-black pl-4 text-sm max-sm:hidden'>  All right reserved. Copyright   @Imagify</p>
        
        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} alt=""  width={35}/>
            <img src={assets.twitter_icon} alt="" width={35}/>
            <img src={assets.instagram_icon} alt="" width={35} />

        </div>

    </div>
    
  )
}

export default Footer