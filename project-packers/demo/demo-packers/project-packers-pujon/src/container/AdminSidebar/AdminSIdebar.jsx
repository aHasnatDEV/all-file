import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminSideBarLink from '../../components/AdminSideBarLink/AdminSideBarLink';

import './AdminSidebar.css';
import order from '../../assets/icons/cd-order.svg';
import products from '../../assets/icons/cd-products.svg';
const AdminSIdebar = () => {
	const [activeLink, setActiveLink] = useState('/admin');

	return (
		<div className='bg-black/10 h-screen'>
			<div className='pt-[30px] text-base text-[#0D3D4B] font-medium '>
				<div className=' adminSidebar flex flex-col  '>
					{/* dashboard */}
					<AdminSideBarLink
						path={'/admin'}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
						linkName='Dashboard'
					/>
					<ul className='flex flex-col'>
						<div className='flex items-center gap-2  p-[8px_20px] '>
							<img src={order} alt='' /> Order
						</div>

						{/* Item request */}
						<AdminSideBarLink
							path={'/admin/itemRequest'}
							activeLink={activeLink}
							setActiveLink={setActiveLink}
							linkName='Item request'
						/>

						{/* All orders */}
						<AdminSideBarLink
							path={'/admin/allOrders'}
							activeLink={activeLink}
							setActiveLink={setActiveLink}
							linkName='All Orders'
						/>
					</ul>
					<ul className='flex flex-col'>
						<div className='flex items-center gap-2 p-[8px_20px] '>
							<img src={products} alt='' /> Products
						</div>

						{/* All Products */}
						<AdminSideBarLink
							path={'/admin/allProducts'}
							activeLink={activeLink}
							setActiveLink={setActiveLink}
							linkName='All Products'
						/>

						{/* Discount */}
						<AdminSideBarLink
							path={'/admin/discount'}
							activeLink={activeLink}
							setActiveLink={setActiveLink}
							linkName='Discount'
						/>
					</ul>

					{/* categories */}
					<AdminSideBarLink
						path={'/admin/categories'}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
						linkName='Categories'
					/>

					{/* customers */}
					<AdminSideBarLink
						path={'/admin/customers'}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
						linkName='Customers'
					/>

					{/* supports */}
					<AdminSideBarLink
						path={'/admin/support'}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
						linkName='Support'
					/>

					{/* staff */}
					<AdminSideBarLink
						path={'/admin/staff'}
						activeLink={activeLink}
						setActiveLink={setActiveLink}
						linkName='Staff'
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminSIdebar;
