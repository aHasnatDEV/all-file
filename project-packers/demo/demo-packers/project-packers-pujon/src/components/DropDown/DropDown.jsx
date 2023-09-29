import React, { useEffect, useRef, useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

/**
 *
 * @param {object} children - receive components for dropdown
 * @param {boolean} isOpen - receive does dropdown open or not. if true then its open else close
 * @param {function} setIsOpen - receive for updating isOpen
 * @param {boolean} isNotification - receive for check which dropdown is it. if true then its for notifications else for cart
 * @returns
 */

const DropDownNotification = ({
	children,
	isOpen,
	setIsOpen,
	isNotification,
}) => {
	// // console.log(isNotification)
	// const [clickedOutside, setClickedOutside] = useState(false);
	// const myRef = useRef();

	// const handleClickOutside = e => {
	// 	if (!myRef.current.contains(e.target)) {
	// 		setClickedOutside(true);
	// 	}
	// };

	// const handleClickInside = () => setClickedOutside(false);

	// useEffect(() => {
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	if (clickedOutside) {
	// 		setIsOpen(false)
	// 		setClickedOutside(false)
	// 	}
	// 	return () => document.removeEventListener('mousedown', handleClickOutside);
	// },[clickedOutside,setIsOpen]);
	return (
		<div
			className={` bg-white p-5 pt-0 rounded-lg z-50 ${isNotification ? 'w-[280px]' : 'w-[381px] '
				}  overflow-y-scroll shadow-2xl ${isOpen
					? 'top-16 right-0 opacity-100'
					: 'opacity-0 -top-[999px] right-0 h-0'
				} transition-all ease-in-out duration-700 absolute `}
		>
			<div className='sticky top-0 pt-5 pb-3 bg-white flex items-center justify-between text-sm font-semibold text-[#124E58]'>
				<p>{isNotification ? 'Notification' : 'Cart'}</p>
				<Link onClick={() => { setIsOpen(false) }} to={isNotification ? '/home/notification' : '/home/cart'}>
					<HiLogout />
				</Link>
			</div>
			<div className='text-sm'>{children}</div>
		</div>
	);
};

export default DropDownNotification;
