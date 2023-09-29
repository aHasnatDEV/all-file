import React from 'react';
// TODO: Remove this when image from db works properly
import Image from '../../assets/card1.png';

/**
 *
 * @param {string} img - recive img src
 * @param {string} title - recive title
 * @param {string} price - recive price
 * @returns
 */
const ProductsCard = ({ img, title, price, className }) => {
	return (
		<div
			className={`w-full sm:min-w-[284px] h-[402px} bg-white ${className} border-[1px] border-[#124d5844]`}
		>
			<div className='flex flex-col justify-center p-3'>
				<img
					src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
					alt='image'
					className='w-[280px] h-[280px]'
				/>
				<p className='text-lg font-semibold'>{title}</p>
				<div className='flex justify-between items-center'>
					<p className='text-base'>Retailer Price</p>
					<p className='text-lg font-semibold'>${price}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductsCard;
