import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import { plane } from '../../../../contexts/terminal/Terminal';

const AddCategory = ({ setRefreshNow }) => {
	const { handleSubmit, register } = useForm();

	const onSubmit = (data) => {
		plane.request({ name: 'registerCategory', body: data }).then((res) => {
			console.log(data);
			setRefreshNow(true)
		});
	};

	return (
		<div>
			<div>
				<h2 className='text-[#0D3D4B] text-base font-semibold mt-2 mb-3'>
					Add category
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='p-3 rounded-lg border flex flex-col'
				>
					{/* category Name */}
					<div className='mb-3'>
						<label
							htmlFor='categoryname'
							className='text-sm font-normal text-slate-600'
						>
							Category Name
						</label>
						<input
							// value={prevProducts && prevProducts.name}
							{...register('categoryname')}
							type='text'
							className='w-full py-2 px-3 border rounded outline-none'
							id='categoryname'
						/>
					</div>

					{/* category slug */}
					<div className='mb-3'>
						<label
							htmlFor='categoryslug'
							className='text-sm font-normal text-slate-600'
						>
							Category Slug
						</label>
						<input
							// value={prevProducts && prevProducts.name}
							{...register('categoryslug')}
							type='text'
							className='w-full py-2 px-3 border rounded outline-none'
							id='categoryslug'
						/>
					</div>

					{/* subcategory Name */}
					<div className='mb-3'>
						<label
							htmlFor='subcategoryname'
							className='text-sm font-normal text-slate-600'
						>
							Subcategory Name
						</label>
						<input
							// value={prevProducts && prevProducts.name}
							{...register('subcategoryname')}
							type='text'
							className='w-full py-2 px-3 border rounded outline-none'
							id='subcategoryname'
						/>
					</div>

					{/* subcategory slug */}
					<div className='mb-3'>
						<label
							htmlFor='subcategoryslug'
							className='text-sm font-normal text-slate-600'
						>
							Subcategory Slug
						</label>
						<input
							// value={prevProducts && prevProducts.name}
							{...register('subcategoryslug')}
							type='text'
							className='w-full py-2 px-3 border rounded outline-none'
							id='subcategoryslug'
						/>
					</div>
					<Button
						buttonType='secondaryButton'
						name='Add new discount'
						className='self-end rounded-[5px] mt-5'
					>
						<input type='submit' />
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AddCategory;
