import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSIdebar from '../container/AdminSidebar/AdminSIdebar';
import Navbar from '../container/Navbar/Navbar';

const Admin = () => {
	return (
		<div className=''>
			<Navbar />
			<div className='flex'>
				<div className='shrink w-[287px]'>
					<AdminSIdebar />
				</div>
				<div className='grow px-8 max-w-screen-2xl mx-auto'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Admin;
