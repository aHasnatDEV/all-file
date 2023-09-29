import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import PreviousButtonHeading from '../../../components/PreviousButtonHeading/PreviousButtonHeading';
import { plane } from '../../../contexts/terminal/Terminal';
// import PreviousButtonHeading from "../../"
const CustomerUpdate = () => {
	const { id } = useParams();
	const [customerDetails, setCustomerDetails] = useState();

	useEffect(() => {
		plane.request({ name: 'allOrders', queries: { user: id } }).then((res) => {
			console.log(res.docs[0].user.fullName);
			setCustomerDetails(res.docs);
		});
	}, []);

	console.log(customerDetails);

	return (
		<div>
			{/* title */}
			<div className='flex items-center justify-between border-b p-[20px_0] '>
				<PreviousButtonHeading
					name={customerDetails ? customerDetails[0]?.user?.fullName : ''}
					buttonName='Back to Customers'
				/>

				<div className='flex items-center gap-2'>
					<button className='p-[8px_16px]'> Export</button>

					<Link to='/admin/newCustomer'>
						<Button
							buttonType='secondaryButton'
							name='Add Customers'
							className='rounded-[5px] w-[150px] '
						/>
					</Link>
				</div>
			</div>

			<div className='flex'>
				<div className='flex-1'>
					<table className='w-full'>
						<thead>
							<tr>
								<th className='text-start'>
									<input type='checkbox' name='' id='' />
								</th>
								<th className='text-start'>Product</th>
								<th className='text-start'>Status</th>
								<th className='text-start'>Price</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>
				</div>
				<div className='w-1/3'>customer</div>
			</div>
		</div>
	);
};

export default CustomerUpdate;
