import React, { useState } from "react";
import { BsQuestion } from "react-icons/bs";



/**
 * 
 * @param {string} question - receive FAQ question
 * @param {string} answer - receive FAQ answer
 * @returns 
 */

const FAQs = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`cursor-pointer p-2 border-b py-4`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex items-center gap-6 font-semibold text-[#124E58] text-lg">
        <button
          className={` border border-black rounded-50 p-[6px] ${
            isActive ? "bg-[#CFF6EF]" : "bg-[#F2C852]"
          } transition-colors duration-200 ` }
          
        >
          <BsQuestion className="text-lg"/>
        </button>
        {question}
      </div>
      <div
        className={`ps-14 text-base text-slate-600 font-normal ${
          isActive ? "  translate-y-0 opacity-100 max-h-[1000px]" : " max-h-0 opacity-0 -translate-y-5"
        } transition-all duration-200`}
        
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQs;
