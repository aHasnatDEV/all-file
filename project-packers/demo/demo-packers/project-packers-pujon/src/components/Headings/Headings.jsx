import React from 'react'

/**
 * 
 * @param {string} title - receive heading title
 * @param {string} subTitle - receive heading subTitle if there any 
 * @returns 
 */
const Headings = ({title, subTitle}) => {
  return (
    <div className='pb-12'>
        <h1 className='text-[32px] text-primary font-bold text-center'>{title}</h1>
        <p className='text-lg font-normal text-center text-slate-600'>{subTitle&& subTitle}</p>
    </div>
  )
}

export default Headings