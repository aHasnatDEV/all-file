import React from 'react';
import { Outlet } from 'react-router-dom';
import MyAcctSidebar from '../components/MyAcctSidebar/MyAcctSidebar';

const MyAccount = () => {
	return (
		<div className=' wrapper flex flex-col md:flex-row  md:mt-[60px] mb-12 md:mb-[227px] gap-5'>
			<MyAcctSidebar />
			<Outlet />
			{/* sddsfdfssdf */}
		</div>
	);
};

export default MyAccount;
