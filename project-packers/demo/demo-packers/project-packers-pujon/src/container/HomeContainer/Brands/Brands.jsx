import React from 'react';
import amazon from '../../../assets/Brands/amazon.png';
import ebay from '../../../assets/Brands/ebay.png';
import Kroger from '../../../assets/Brands/Kroger.png';
import nike from '../../../assets/Brands/nike.png';
import walmart from '../../../assets/Brands/walmart.png';
import ikea from '../../../assets/Brands/ikea.png';

const Brands = () => {
	return (
		<div className='w-full  py-[48px]'>
			<div className='wrapper'>
				{/* headings */}
				<div className='text-center text-lg md:text-2xl sm:w-[335px] md:w-[597px] mx-auto font-semibold text-[#0d3d4b]  '>
					Buy Real USA product from any band through our Project Packers
					platform
				</div>

				{/* Image */}
				<div className='py-5 flex gap-12   overflow-x-scroll'>
					<img src={nike} alt='' />
					<img src={walmart} alt='' />
					<img src={ebay} alt='' />
					<img src={amazon} alt='' />
					<img src={ikea} alt='' />
					<img src={Kroger} alt='' />

					<img src={nike} alt='' />
					<img src={walmart} alt='' />
					<img src={ebay} alt='' />
					<img src={amazon} alt='' />
					<img src={ikea} alt='' />
					<img src={Kroger} alt='' />
				</div>
			</div>
		</div>
	);
};

export default Brands;
