import React, { useEffect, useState } from 'react';
import { plane } from '../../../../contexts/terminal/Terminal';
// import { plane } from '../../../../contexts/terminal/Terminal';
// import

const ProductCategory = ({ register, prevProducts }) => {
	const [category, setCategory] = useState();
	const [categoryID, setCategoryID] = useState();
9
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

	const handleChange = (e) => {
		const id = e.target.value;
		// console.log(e.target.value);
		setCategoryID(id);
		register('category', { value: id });
	};

	return (
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
					<option defaultChecked={!prevProducts}>Select category</option>
					{category?.map((item, i) => (
						<option
							// defaultChecked={item.id == prevProducts.category.id}
							key={i}
							value={item.id}
						>
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
							// console.log(c.id);
							// console.log(categoryID);
							return c.id === categoryID;
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
				<label htmlFor='tags' className='text-sm font-normal text-slate-600'>
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
	);
};

export default ProductCategory;
