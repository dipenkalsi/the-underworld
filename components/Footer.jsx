import React from 'react'
import {BsGithub} from "react-icons/bs"
import {BsTwitter} from "react-icons/bs"
import {BsInstagram} from "react-icons/bs"
import {BsLinkedin} from "react-icons/bs"
import {SiLeetcode} from "react-icons/si"

const Footer = () => {
  return (
    <div className='mt-5 border-t border-gray-700 '>
      <div className='text-purple-300 text-center text-sm py-3'>
        Copyright &copy; Dipen Kalsi, 2023. All rights reserved.
      </div>
      <div className='flex space-x-2 items-center justify-center text-purple-300 text-2xl pb-3'>
        <a className='p-2 hover:bg-white/[0.1] transition-all duration-100 ease-in rounded-full' href='https://github.com/dipenkalsi' target="_blank">
            <BsGithub/>
        </a>
        <a className='p-2 hover:bg-white/[0.1] transition-all duration-100 ease-in rounded-full' href='https://github.com/dipenkalsi' target="_blank">
            <BsLinkedin/>
        </a>
        <a className='p-2 hover:bg-white/[0.1] transition-all duration-100 ease-in rounded-full' href='https://github.com/dipenkalsi' target="_blank">
            <BsInstagram/>
        </a>
        <a className='p-2 hover:bg-white/[0.1] transition-all duration-100 ease-in rounded-full' href='https://github.com/dipenkalsi' target="_blank">
            <BsTwitter/>
        </a>
        <a className='p-2 hover:bg-white/[0.1] transition-all duration-100 ease-in rounded-full' href='https://github.com/dipenkalsi' target="_blank">
            <SiLeetcode/>
        </a>
      </div>
    </div>
  )
}

export default Footer
