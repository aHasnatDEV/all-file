import React from 'react';
import { useForm } from 'react-hook-form';
import PreviousButtonHeading from '../../../components/PreviousButtonHeading/PreviousButtonHeading';
import CustomerAddress from '../../../container/AdminContainer/Customers/CustomerAddress/CustomerAddress';
import CustomerOverview from '../../../container/AdminContainer/Customers/CustomerOverview/CustomerOverview';

const NewCustomer = () => {
	const { handleSubmit, register } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div>
			<div className='p-[20px_0]  border-b w-full flex justify-between items-center'>
				<PreviousButtonHeading
					name='New customer'
					buttonName='Back to customers'
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* customer overview */}
				<div className='flex my-5 items-start justify-between'>
					<div className='flex-1'>
						<h2 className='text-base font-semibold text-[#0D3D4B] mb-4'>
							Customer Overview
						</h2>
						<p className='text-[#64748B] text-sm font-normal'>
							We can help with that Replace your next meeting with a short video
							and get feedback faster .
						</p>
					</div>
					<div className='flex-1'>
						<CustomerOverview register={register} />
					</div>
				</div>
				{/* Address */}
				<div className='flex mt-3 mb-5 items-start justify-between'>
					<div className='flex-1'>
						<h2 className='text-base font-semibold text-[#0D3D4B] mb-4'>
							Address
						</h2>
						<p className='text-[#64748B] text-sm font-normal'>
							We can help with that Replace your next meeting with a short video
							and get feedback faster .
						</p>
					</div>
					<div className='flex-1'>
						<CustomerAddress register={register} />
						{/* buttons */}
						<div className='flex  items-center justify-between mt-3'>
							<button
								onClick={(e) => {
									e.preventDefault();
								}}
								className='p-[8px_16px] border rounded '
							>
								Discard
							</button>

							<div className='flex gap-3'>
								<button
									onClick={(e) => {
										e.preventDefault();
									}}
									className='p-[8px_16px] border rounded '
								>
									Draft
								</button>
								<button
									type='submit'
									className='p-[8px_16px] border rounded bg-[#F2C852]'
								>
									Publish
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewCustomer;
