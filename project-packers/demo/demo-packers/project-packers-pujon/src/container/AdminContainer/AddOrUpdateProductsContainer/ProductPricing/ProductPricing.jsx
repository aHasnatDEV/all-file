import React from 'react';

const ProductPricing = ({ register }) => {
	return (
		<div className='w-full p-3 rounded-lg border flex gap-3'>
			{/* Price */}
			<div className='mb-2'>
				<label htmlFor='price' className='text-sm font-normal text-slate-600'>
					Price
				</label>
				<input
					type='number'
					className='w-full py-2 px-3 border rounded outline-none'
					id='Price'
					{...register('price')}
				/>
			</div>

			{/* Fee */}
			<div className='mb-2'>
				<label htmlFor='fee' className='text-sm font-normal text-slate-600'>
					Fee
				</label>
				<input
					type='number'
					className='w-full py-2 px-3 border rounded outline-none'
					id='fee'
					{...register('fee')}
				/>
			</div>
			{/* tax */}
			<div className='mb-2'>
				<label htmlFor='tax' className='text-sm font-normal text-slate-600'>
					Tax
				</label>
				<input
					type='number'
					className='w-full py-2 px-3 border rounded outline-none'
					id='tax'
					{...register('tax')}
				/>
			</div>
		</div>
	);
};

export default ProductPricing;
