import React, { useEffect, useState } from 'react';
import { plane } from '../../../../contexts/terminal/Terminal';

const ShowCategory = ({
	refreshNow,
	setSelectedCategory,
	setIsEdit,
	setRefreshNow,
}) => {
	const [existingCategories, setExistingCategories] = useState();

	useEffect(() => {
		plane.request({ name: 'allCategory' }).then((res) => {
			console.log(res);
			setExistingCategories(res);
			setRefreshNow(false);
		});
	}, [refreshNow]);
	return (
		<div>
			<div className='flex items-center justify-between'>
				<button className='p-[8px_12px]'>Delete</button>
				<button>Sort</button>
			</div>
			<table className='w-full'>
				<thead>
					<tr className=' border-y bg-slate-50 text-slate-600'>
						<th className='text-start p-[10px_16px]'>
							<input type='checkbox' name='' id='' />
						</th>
						<th className='text-start p-[10px_16px]'>Name</th>
						<th className='text-start p-[10px_16px]'>Slug</th>
						<th className='text-start p-[10px_16px]'>Post</th>
					</tr>
				</thead>
				<tbody>
					{existingCategories &&
						existingCategories.map((category) => (
							<tr
								key={category.id}
								className='border-b py-[180px] hover:bg-[#FEF9DC] '
							>
								<td className='p-[18px_16px]'>
									<input type='checkbox' name='' id='' />
								</td>
								<td
									onClick={
										() => {
											setSelectedCategory(category);
											setIsEdit(true);
										}
										// navigate(`/admin/orderDetails/${order.id}`)
									}
									className='p-[18px_16px] cursor-pointer'
								>
									{category.name}
								</td>
								<td className='p-[18px_16px]'>{category.slug}</td>
								<td className='p-[18px_16px]'></td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ShowCategory;
