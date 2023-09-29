import React, { useState } from 'react';

import TableFunctions1 from '../../../components/TableFunctions1/TableFunctions1';
import ItemRequestTable from '../../../components/ItemRequestTable/ItemRequestTable';

const ItemRequest = () => {
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
			name: 'Estimate sent',
			value: 'sent',
		},
		{
			name: 'Closed',
			value: 'closed',
		},
		{
			name: 'canceled',
			value: 'Canceled',
		},
		{
			name: 'Abandoned',
			value: 'abandoned',
		},
	];

	return (
		<div>
			{/* title */}
			<div>
				<h2 className='p-[20px_0]  border-b w-full text-[#0D3D4B] text-xl font-semibold'>
					Item Request
				</h2>
			</div>

			{/* table function */}
			<TableFunctions1
				buttons={buttons}
				onClick={handleClick}
				onChange={handleChangeSearch}
				selectedButton={selectedButton}
			/>

			{/* for showing table */}
			<ItemRequestTable filterStatus={selectedButton} filterSearch={searchId} />
		</div>
	);
};

export default ItemRequest;
