import React from 'react'
import { BsSearch } from 'react-icons/bs'


/**
 * 
 * @param {string} aboutQuestion - receive about question
 * @param {string} aboutAnswer- receive about answer
 * @returns 
 */
const AboutFAQs = ({aboutQuestion, aboutAnswer}) => {
  return (
    <div>
        <div className="flex items-center gap-6 font-semibold text-[#124E58] text-lg">
        <span
          className={` border border-black rounded-50 p-[6px] bg-[#F2C852] transition-colors duration-500 ` }
          
        >
          <BsSearch className="text-lg"/>
        </span>
        {aboutQuestion}
      </div>
      <div
        className={`ps-14 text-base text-slate-600 font-normal`}
      >
        {aboutAnswer}
      </div>

    </div>
  )
}

export default AboutFAQs