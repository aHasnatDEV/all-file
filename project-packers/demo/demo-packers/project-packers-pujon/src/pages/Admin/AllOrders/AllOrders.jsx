import React, { useState } from 'react';
// import OrdersTable from '../../../components/OrdersTable/OrdersTable';
import Overview from '../../../container/AdminContainer/Overview/Overview';

import TableFunctions1 from '../../../components/TableFunctions1/TableFunctions1';
import OrdersTable from '../../../container/AdminContainer/Orders/OrdersTable/OrdersTable';

const AllOrders = () => {
	const [selectedButton, setSelectedButton] = useState('all');
	const [searchId, setSearchId] = useState(null);

	console.log(searchId);

	const handleClick = (e) => {
		e.preventDefault();
		console.log('clicked');
		setSelectedButton(e.target.value);
	};

	const handleChangeSearch = (e) => {
		setSearchId(e.target.value);
	};

	const buttons = [
		{
			name: 'All',
			value: 'all',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Processing',
			value: 'processing',
		},
		{
			name: 'Shipping',
			value: 'shipping',
		},
		{
			name: 'canceled',
			value: 'Canceled',
		},
		{
			name: 'Completed',
			value: 'completed',
		},
		{
			name: 'Refund',
			value: 'refunded',
		},
		{
			name: 'Paid',
			value: 'paid',
		},
	];

	return (
		<div>
			{/* title */}
			<div>
				<h2 className='p-[20px_0]  border-b w-full text-[#0D3D4B] text-xl font-semibold'>
					All Orders
				</h2>
			</div>

			{/* for overview */}
			<div>
				<Overview />
			</div>

			{/* table function */}
			<TableFunctions1
				buttons={buttons}
				onClick={handleClick}
				onChange={handleChangeSearch}
				selectedButton={selectedButton}
			/>

			{/* for showing table */}
			<OrdersTable filterStatus={selectedButton} filterSearch={searchId} />
		</div>
	);
};

export default AllOrders;
