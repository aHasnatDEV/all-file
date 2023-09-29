import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import AddCategory from '../../../container/AdminContainer/AddOrUpdateCategory/AddCategory/AddCategory';
import ShowCategory from '../../../container/AdminContainer/AddOrUpdateCategory/ShowCategory/ShowCategory';
import UpdateCategory from '../../../container/AdminContainer/AddOrUpdateCategory/UpdateCategory/UpdateCategory';
import { plane } from '../../../contexts/terminal/Terminal';

const Categories = () => {
	const { handleSubmit, register } = useForm();

	const [isEdit, setIsEdit] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState();
	const [refreshNow, setRefreshNow] = useState(false);

	return (
		<div>
			<div className='flex items-center justify-between border-b'>
				<h2 className='p-[20px_0]   w-full text-[#0D3D4B] text-xl font-semibold'>
					Discount
				</h2>
				{isEdit && (
					<Button
						onClick={() => setIsEdit(false)}
						name='Add new category'
						buttonType='secondaryButton'
						className='rounded-[5px] w-[15rem] '
					/>
				)}
			</div>

			<div className='flex gap-4 mt-4'>
				<div className='w-1/3 '>
					{!isEdit && (
						<AddCategory setRefreshNow={setRefreshNow} register={register} />
					)}
					{isEdit && <UpdateCategory selectedCategory={selectedCategory} />}
				</div>

				{/* category table */}
				<div className='flex-1'>
					<ShowCategory
						setRefreshNow={setRefreshNow}
						refreshNow={refreshNow}
						setIsEdit={setIsEdit}
						setSelectedCategory={setSelectedCategory}
					/>
				</div>
			</div>
		</div>
	);
};

export default Categories;
