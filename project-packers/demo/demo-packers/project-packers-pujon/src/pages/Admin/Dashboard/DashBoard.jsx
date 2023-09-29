import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import graph from '../../../assets/Thrash/Assets.png';
import heatmap from '../../../assets/Thrash/Row.png';
import ItemRequestTable from '../../../components/ItemRequestTable/ItemRequestTable';
import OrdersTable from '../../../container/AdminContainer/Orders/OrdersTable/OrdersTable';

import Overview from '../../../container/AdminContainer/Overview/Overview';

const DashBoard = () => {
	const [selectedButton, setSelectedButton] = useState('orders');

	const handleSelected = (e) => {
		setSelectedButton(e.target.value);
	};

	return (
		<div>
			<h2 className='p-[20px_0]  border-b w-full text-[#0D3D4B] text-xl font-semibold'>
				Overview
			</h2>
			<>
				<Overview />
			</>
			<div className='flex gap-4 py-5 justify-between'>
				<img src={graph} alt='' className='min-w-[1012px] min-h-[386x]' />
				{/* <Chart /> */}
				<img src={heatmap} alt='' className='min-w-[528px] min-h-[386x]' />
			</div>
			<div className='flex items-center justify-between'>
				<div>
					<button
						onClick={handleSelected}
						className={`p-[8px_12px] cursor-pointer ${
							selectedButton === 'request' ? 'bg-[#CFF6EF] rounded' : ''
						}`}
						value='request'
					>
						Request
					</button>
					<button
						onClick={handleSelected}
						className={`p-[8px_12px] cursor-pointer ${
							selectedButton === 'orders' ? 'bg-[#CFF6EF] rounded' : ''
						}`}
						value='orders'
					>
						Orders
					</button>
				</div>
				<Link
					to={`${
						selectedButton === 'orders'
							? '/admin/allOrders'
							: '/admin/itemRequest'
					}`}
				>
					View All
				</Link>
			</div>
			{selectedButton === 'orders' ? <OrdersTable /> : <ItemRequestTable />}
		</div>
	);
};

export default DashBoard;
