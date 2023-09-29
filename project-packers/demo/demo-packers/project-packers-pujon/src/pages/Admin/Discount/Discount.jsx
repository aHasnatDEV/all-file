import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import TableFunctions1 from '../../../components/TableFunctions1/TableFunctions1';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const buttons = [
	{
		name: 'All',
		value: 'all',
	},
	{
		name: 'Active',
		value: 'active',
	},
	{
		name: 'Draft',
		value: 'draft',
	},
	{
		name: 'Archived',
		value: 'archive',
	},
];

const Discount = () => {
	const [selectedButton, setSelectedButton] = useState('all');
	const [searchId, setSearchId] = useState(null);
	const [discount, setDiscount] = useState();
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const [axiosSecure] = useAxiosSecure();
	const baseURL = axiosSecure.getUri();

	const handleChangeSearch = (e) => {
		setSearchId(e.target.value);
	};

	const handleClick = (e) => {
		console.log(e.target.value);
		setSelectedButton(e.target.value);
	};

	let url;

	if (selectedButton === 'all' && !searchId) {
		url = `discount?`;
	} else if (selectedButton !== 'all' && !searchId) {
		url = `discount?status=${selectedButton}`;
	} else if (selectedButton !== 'all' && searchId) {
		url = `discount?status=${selectedButton}&id=${searchId}`;
	} else if (selectedButton === 'all' && searchId) {
		url = `discount?id=${searchId}`;
	}

	useEffect(() => {
		axiosSecure.get(`${url}&page=${page}`).then((res) => {
			console.log(res.data);
			setDiscount(res.data);
		});
	}, [url]);

	return (
		<div>
			{/* title */}
			<div className='flex items-center justify-between border-b'>
				<h2 className='p-[20px_0]   w-full text-[#0D3D4B] text-xl font-semibold'>
					Discount
				</h2>
				<Link to='/admin/addDiscount'>
					<Button
						buttonType='secondaryButton'
						name='Add Coupon'
						className='rounded-[5px] w-[200px] '
					/>
				</Link>
			</div>

			{/* table function */}
			<TableFunctions1
				buttons={buttons}
				onClick={handleClick}
				onChange={handleChangeSearch}
				selectedButton={selectedButton}
			/>

			{/* Table */}
			<div>
				<table className='w-full'>
					<thead>
						<tr className=' border-y bg-slate-50 text-slate-600'>
							<th className='text-start p-[10px_16px]'>
								<input type='checkbox' name='' id='' />
							</th>
							<th className='text-start p-[10px_16px]'>Code</th>
							<th className='text-start p-[10px_16px]'>Coupon Type</th>
							<th className='text-start p-[10px_16px]'>Coupon amount</th>
							<th className='text-start p-[10px_16px]'>Description</th>
							<th className='text-start p-[10px_16px]'>Usage / Limit</th>
							<th className='text-start p-[10px_16px]'>Expiry Date</th>
						</tr>
					</thead>
					<tbody>
						{discount &&
							discount.map((d) => (
								<tr key={d.id} className='border-b py-[180px] '>
									{/* check box */}
									<td className='p-[18px_16px]'>
										<input type='checkbox' name='' id='' />
									</td>
									{/* code */}
									<td
										onClick={(e) => {
											e.preventDefault();
											navigate(`/admin/updateDiscount/${d.id}`, {
												state: { discount: d },
											});
										}}
										className='p-[18px_16px] cursor-pointer '
									>
										{d.code}
									</td>
									{/* coupon type */}
									<td className='p-[18px_16px]'></td>
									{/* <td className='p-[18px_16px]'>{product.quantity}</td> */}

									{/* coupon amount */}
									<td className='p-[18px_16px]'>{d.amount}</td>
									{/* description */}
									<td className='p-[18px_16px]'></td>
									{/* limit */}
									<td className='p-[18px_16px]'>/{d.limit}</td>
									{/* expire date */}
									<td className='p-[18px_16px]'>{d.expiry_date}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Discount;
