import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Status from '../../../../components/Status/Status';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import Status from '../Status/Status';

const OrdersTable = ({ filterStatus, filterSearch }) => {
	const [allOrders, setAllOrders] = useState();
	const navigate = useNavigate();

	const [axiosSecure] = useAxiosSecure();
	console.log(filterStatus);

	useEffect(() => {
		if (!filterSearch && !filterStatus) {
			axiosSecure.get(`/order`).then((res) => {
				setAllOrders(res.data.docs);
			});
		} else if (filterStatus !== 'all') {
			if (!filterSearch) {
				axiosSecure.get(`/order?status=${filterStatus}`).then((res) => {
					setAllOrders(res.data.docs);
				});
			} else {
				axiosSecure
					.get(`/order?status=${filterStatus}&&id=${filterSearch}`)
					.then((res) => {
						setAllOrders(res.data.docs);
					});
			}
		} else {
			if (!filterSearch) {
				axiosSecure.get(`/order`).then((res) => {
					setAllOrders(res.data.docs);
				});
			} else {
				axiosSecure.get(`/order?id=${filterSearch}`).then((res) => {
					setAllOrders(res.data.docs);
				});
			}
		}
	}, [filterStatus, filterSearch]);

	return (
		<div>
			<table className='w-full'>
				<thead>
					<tr className=' border-y bg-slate-50 text-slate-600'>
						<th className='text-start p-[10px_16px]'>
							<input type='checkbox' name='' id='' />
						</th>
						<th className='text-start p-[10px_16px]'>Order ID</th>
						<th className='text-start p-[10px_16px]'>Product Name</th>
						<th className='text-start p-[10px_16px]'>Date</th>
						<th className='text-start p-[10px_16px]'>Customer</th>
						<th className='text-start p-[10px_16px]'>Status</th>
						<th className='text-start p-[10px_16px]'>Items</th>
						<th className='text-start p-[10px_16px]'>Total</th>
						<th className='text-start p-[10px_16px]'>Action</th>
					</tr>
				</thead>
				<tbody>
					{allOrders &&
						allOrders.map((order) => (
							<tr
								key={order.id}
								className='border-b py-[180px] hover:bg-[#FEF9DC] '
							>
								<td className='p-[18px_16px]'>
									<input type='checkbox' name='' id='' />
								</td>
								<td
									onClick={() => navigate(`/admin/orderDetails/${order.id}`)}
									className='p-[18px_16px] cursor-pointer'
								>
									{order.id}
								</td>
								<td className='p-[18px_16px]'>
									{order.products[0].product.name}
								</td>
								<td className='p-[18px_16px]'>{order.date}</td>
								<td className='p-[18px_16px]'>{order.user.fullName}</td>
								<td className='p-[18px_16px]'>
									<Status title={order.status} />
								</td>
								<td className='p-[18px_16px]'>{order.products.length}</td>
								<td className='p-[18px_16px]'>{order.total}</td>
								<td className='p-[18px_16px]'></td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersTable;
