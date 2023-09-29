import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../container/Navbar/Navbar';

const AuthRoot = () => {
	return (
		<div>
			<Navbar />
			<div className='bg-[#0D3D4B]'>
				<Outlet />
				{/* footer */}
				<div className='wrapper border-t border-white/10 flex items-center justify-center text-center text-white/60 text-sm'>
					<p className='py-8'>
						Use of Project Packers signifies agreement with our Privacy Notice
						and Terms of Service <br /> © 2023 Project Packers. All rights
						reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthRoot;
