import React from 'react';

const CustomerOverview = ({ register }) => {
	return (
		<div className='border rounded-lg w-full p-3 flex flex-col gap-3'>
			{/* name */}
			<div className='flex items-center gap-2'>
				{/* first name */}
				<div className='mb-2 w-full'>
					<label
						htmlFor='firstName'
						className='text-sm font-normal text-slate-600'
					>
						First Name
					</label>
					<input
						{...register('firstName')}
						type='text'
						className='w-full py-2 px-3 border rounded outline-none'
						id='firstName'
					/>
				</div>
				{/* last name */}
				<div className='mb-2 w-full'>
					<label
						htmlFor='lastName'
						className='text-sm font-normal text-slate-600'
					>
						Last Name
					</label>
					<input
						{...register('lastName')}
						type='text'
						className='w-full py-2 px-3 border rounded outline-none'
						id='lastName'
					/>
				</div>
			</div>
			<div className='mb-2'>
				<label htmlFor='email' className='text-sm font-normal text-slate-600'>
					Email
				</label>
				<input
					{...register('email')}
					type='email'
					className='w-full py-2 px-3 border rounded outline-none'
					id='email'
				/>
			</div>
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

export default CustomerOverview;
