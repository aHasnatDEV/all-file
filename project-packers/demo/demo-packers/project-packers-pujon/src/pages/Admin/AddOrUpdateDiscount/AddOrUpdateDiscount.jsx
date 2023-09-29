import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import PreviousButtonHeading from '../../../components/PreviousButtonHeading/PreviousButtonHeading';
import { plane } from '../../../contexts/terminal/Terminal';

const AddOrUpdateDiscount = () => {
	const { register, handleSubmit } = useForm();

	const [category, setCategory] = useState();
	const [categoryID, setCategoryID] = useState();

	const { id } = useParams();

	const location = useLocation();
	const newDiscount = location.pathname.includes(id);
	const prevDiscount = location?.state?.discount;

	// console.log(newDiscount);
	// console.log(prevDiscount);

	useEffect(() => {
		plane
			.request({
				name: 'allCategory',
			})
			.then((data) => {
				// console.log(data);
				setCategory(data);
			});
	}, []);

	// console.log(category);

	const handleChange = (e) => {
		const id = e.target.value;
		// console.log(e.target.value);
		setCategoryID(id);
		register('category', { value: id });
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div>
			<div className='p-[20px_0]  border-b w-full flex justify-between items-center'>
				<PreviousButtonHeading
					name='Add new Discount'
					buttonName='Back to discount'
				/>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
				{/* Coupon details */}
				<>
					<h2 className='text-[#0D3D4B] text-base font-semibold mb-3'>
						Coupon details
					</h2>

					<div className='w-full p-3 rounded-lg border gap-3'>
						{/* Coupon Code */}
						<div className='mb-2'>
							<label
								htmlFor='code'
								className='text-sm font-normal text-slate-600'
							>
								Coupon Code
							</label>
							<div className='flex items-center gap-1'>
								<input
									type='text'
									className='w-full py-2 px-3 border rounded outline-none'
									id='code'
									{...register('code')}
								/>
								<button className='p-[8px_12px] border rounded w-[200px]'>
									Generate coupon code
								</button>
							</div>
						</div>

						{/* description */}
						<div className='mb-2'>
							<label
								htmlFor='description'
								className='text-sm font-normal text-slate-600'
							>
								Description (Optional)
							</label>
							<textarea
								id='description'
								cols='30'
								rows='10'
								className='w-full py-2 px-3 border rounded outline-none'
							></textarea>
						</div>
					</div>
				</>

				{/* General */}
				<>
					<h2 className='text-[#0D3D4B] text-base font-semibold my-3'>
						General
					</h2>

					<div className='w-full p-3 rounded-lg border'>
						{/* product category */}
						<div className='mb-2'>
							<label
								htmlFor='category'
								className='text-sm font-normal text-slate-600'
							>
								Product Category
							</label>

							<select
								name='category'
								id='category'
								className='w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none'
								// {...register('category')}
								onChange={(e) => handleChange(e)}
							>
								<option defaultChecked>Select category</option>
								{category?.map((item, i) => (
									<option key={i} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</div>

						{/* subCategory */}
						<div className='mb-2'>
							<label
								htmlFor='subcategory'
								className='text-sm font-normal text-slate-600'
							>
								Sub Category
							</label>
							<select
								id='subcategory'
								// disabled
								className='w-full py-2 px-3 border bg-white appearance-none cursor-pointer rounded outline-none'
								{...register('subcategory')}
							>
								<option defaultChecked>Select SubCategory</option>
								{category
									?.filter((c) => {
										return c?.id === categoryID;
									})
									?.map((c) =>
										c?.subcategory?.map((s, i) => (
											<option key={i} value={s?.id}>
												{s?.name}
											</option>
										)),
									)}
							</select>
						</div>

						{/* tags */}
						<div className='mb-2'>
							<label
								htmlFor='tags'
								className='text-sm font-normal text-slate-600'
							>
								Tags
							</label>
							<input
								type='text'
								{...register('tags')}
								className='w-full py-2 px-3 border rounded outline-none'
								id='tags'
							/>
						</div>
					</div>
				</>

				{newDiscount ? (
					<button
						type='submit'
						className='p-[8px_16px] border rounded ml-2 mt-4'
					>
						Update Discount
					</button>
				) : (
					<button type='submit' className='p-[8px_16px] border rounded mt-4'>
						Add Discount
					</button>
				)}
			</form>
		</div>
	);
};

export default AddOrUpdateDiscount;
