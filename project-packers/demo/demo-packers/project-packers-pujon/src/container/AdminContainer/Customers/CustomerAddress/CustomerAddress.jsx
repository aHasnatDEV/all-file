import React from 'react';

const CustomerAddress = ({ register }) => {
	return (
		<div className='border rounded-lg w-full p-3 flex flex-col gap-3'>
			{/* Address */}
			<div className='mb-2'>
				<label htmlFor='address' className='text-sm font-normal text-slate-600'>
					Address
				</label>
				<input
				
					{...register('address')}
					type='text'
					className='w-full py-2 px-3 border rounded outline-none'
					id='address'
				/>
			</div>
			{/* City and Zip*/}
			<div className='flex items-center gap-2'>
				{/* city*/}
				<div className='mb-2 w-full'>
					<label htmlFor='city' className='text-sm font-normal text-slate-600'>
						City
					</label>
					<input
					
						{...register('city')}
						type='text'
						className='w-full py-2 px-3 border rounded outline-none'
						id='city'
					/>
				</div>
				{/* Zip/Postal Code */}
				<div className='mb-2 w-full'>
					<label htmlFor='zip' className='text-sm font-normal text-slate-600'>
						Zip/Postal Code
					</label>
					<input
					
						{...register('zip')}
						type='text'
						className='w-full py-2 px-3 border rounded outline-none'
						id='zip'
					/>
				</div>
			</div>
			{/* Phone number */}
			<div className='mb-2'>
				<label htmlFor='Phone' className='text-sm font-normal text-slate-600'>
					Phone Number
				</label>
				<input
				
					{...register('phone')}
					type='tel'
					className='w-full py-2 px-3 border rounded outline-none'
					id='Phone'
				/>
			</div>
		</div>
	);
};

export default CustomerAddress;
