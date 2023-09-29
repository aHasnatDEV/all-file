import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { HiOutlineInbox } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import './MyAcctSidebar.css';
import { UserContext } from '../../contexts/user/UserContext';
const MyAcctSidebar = () => {
	const { Logout } = useContext(UserContext);
	return (
		<div className='sidebar flex md:flex-col flex-row  gap-5 text-slate-600  text-base font-normal p-5 md:border border-[#124E58]/10 rounded-xl h-fit w-[283px]'>
			<NavLink
				to='/home/myAccount/orders'
				className={`p-[12px_32px] rounded-50 border border-[#124E58]/10 flex items-center`}
			>
				<HiOutlineInbox className='text-2xl' />
				<span className='hidden md:block'>Orders</span>
			</NavLink>
			<NavLink
				to='/home/myAccount/accountDetails'
				className={`p-[12px_32px] rounded-50 border border-[#124E58]/10 flex items-center text-base font-normal w-full`}
			>
				<AiOutlineUser className='text-2xl' />
				<span className='hidden md:block'>
					<span>Account</span>
					<span className='ml-1'>details</span>
				</span>
			</NavLink>
			<button
				onClick={() => Logout()}
				className={`p-[12px_32px] rounded-50 border border-[#124E58]/10 flex items-center `}
			>
				<RiLogoutCircleRLine className='text-2xl' />
				<span className='hidden md:block'>Logout</span>
			</button>
		</div>
	);
};

export default MyAcctSidebar;
