import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import Status from '../../../components/Status/Status';
import eye from '../../../assets/icons/eye.svg';
import { Link } from 'react-router-dom';
import { plane } from '../../../contexts/terminal/Terminal';
const MyAccountOrders = () => {
	const [userOrder, setUserOrder] = useState()

	useEffect(() => {
		plane.request({ name: 'userOrder', queries: { page: 1 , sortBy:'date:desc'} }).then(data => data.docs && setUserOrder(data.docs))
	}, [])
	return (
		<div className='w-full overflow-x-scroll'>
			<table className='w-full '>
				<thead className='bg-slate-50 border-b'>
					<tr>
						<th className='text-start p-[10px_16px]'>Order ID</th>
						<th className='text-start p-[10px_16px]'>Date</th>
						<th className='text-start p-[10px_16px]'>Items</th>
						<th className='text-start p-[10px_16px]'>Total</th>
						<th className='text-start p-[10px_16px]'>Status</th>
						<th className='text-start p-[10px_16px]'>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						userOrder?.map(order => {
							const formattedDate = new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
								hour12: true,
							}).format(new Date(order.date));
							return <tr key={order.id} className='border-b'>
								<td className='p-[18px_16px]'># {order.id}</td>
								<td className='p-[18px_16px]'>{formattedDate}</td>
								<td className='p-[18px_16px]'>{order.products.length + order.requests.length}</td>
								<td className='p-[18px_16px]'>{order.total} tk</td>
								<td className='p-[18px_16px]'>
									<Status title={order.status} />
								</td>
								<td className='p-[18px_16px]'>
									<Link>
										<img src={eye} alt='' />
									</Link>
								</td>
							</tr>
						})
					}
				</tbody>
			</table>
		</div>
	);
};

export default MyAccountOrders;
