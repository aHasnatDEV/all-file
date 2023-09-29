import React from "react";
import logo from "../../assets/logo2.png";
import visa from "../../assets/Payments/visa.png";
import payments from "../../assets/Payments/payments.png";
import { MdCall } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { CiLocationOn, CiFacebook, CiTwitter, CiInstagram } from "react-icons/ci";
const Footer = () => {
  return (
    <footer className="bg-primary text-white z-40 relative">
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-8">
        <div>
          <img className="mb-5" src={logo} alt="" />
          <p className="flex items-center gap-3">
            {" "}
            <MdCall /> <span>01789173903</span>
          </p>
          <p className="flex items-center gap-3 my-3">
            {" "}
            <BiSupport /> <span>pujon_das@coredevs.ltd</span>
          </p>
          <p className="flex items-center gap-3">
            {" "}
            <CiLocationOn />{" "}
            <span>
              West Shewrapara, Mirpur-10, <br /> Dhaka-1216, Bangladesh
            </span>
          </p>
        </div>

        <div>
          <p className="text-[#6BCCCB] font-semibold mb-5">Quick Navigation</p>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About Us</li>
            <li>My Request</li>
            <li>Contact Us</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <p className="text-[#6BCCCB] font-semibold mb-5">Help</p>
          <ul className="space-y-2">
            <li>Support Center</li>
            <li>How Project Packers works</li>
            <li>Shiping Delivary</li>
            <li>Cancellation & Refund</li>
            <li>FAQs</li>
            <li>Live Chat Supports</li>
          </ul>
        </div>

        <div>
          <p className="text-[#6BCCCB] font-semibold mb-5">Payment Methods</p>
          {/* <div className='grid grid-cols-4'>
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
                <img src={visa} alt="" />
            </div> */}

          <img src={payments} alt="" />
        </div>
      </div>
      <hr className="wrapper mx-auto" />
      <div className="wrapper flex items-center flex-col md:flex-row justify-between py-4">
        <p>&copy; Copyright 2023 Project Packers</p>
        <p className="flex gap-2">
          <span className="text-[#6BCCCB] font-semibold   text-3xl">
            <CiFacebook />
          </span> <span className="text-[#6BCCCB] font-semibold  text-3xl">
            <CiInstagram />
          </span>
          <span className="text-[#6BCCCB] font-semibold  text-3xl">
            <CiTwitter />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
