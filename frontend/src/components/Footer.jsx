import React from 'react'
import { Footer, FooterCopyright, FooterDivider, FooterIcon } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsX, BsYoutube} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                 <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >AA</span> Blog
                 </Link>
            </div>
            <div className="flex gap-6 sm:mt-5 mt-4 sm:justify-center">
                <FooterIcon href='#' icon={BsFacebook}/>
                <FooterIcon href='#' icon={BsInstagram}/>
                <FooterIcon href='#' icon={BsYoutube}/>
                <FooterIcon href='#' icon={BsX}/>
            </div>
        </div>
        <FooterDivider/>
        <div className="">
            <FooterCopyright href='#' by='AABlogs' year={new Date().getFullYear()}/>
        </div>
      </div>
    </Footer>
  )
}

