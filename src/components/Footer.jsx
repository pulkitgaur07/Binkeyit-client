import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t bg-white'>
        <div className='container p-4 mx-auto text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p>© All Rights Reserved 2024.</p>
            <div className='flex items-center justify-center gap-4 text-xl'>
                <a href='' className="hover:text-primary-100">
                    <FaFacebook />
                </a>
                <a href='' className="hover:text-primary-100">
                    <FaInstagram />
                </a>
                <a href='' className="hover:text-primary-100">
                    <FaLinkedin />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
