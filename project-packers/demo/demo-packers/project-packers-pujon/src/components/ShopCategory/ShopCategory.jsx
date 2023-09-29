// CategorySidebar.js
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useEffect } from 'react';
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { plane } from '../../contexts/terminal/Terminal';

const ShopCategory = ({ setIds, ids }) => {
	const [categories, setCategories] = useState();
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [axiosSecure] = useAxiosSecure();

	useEffect(() => {
		plane.request({ name: 'allCategory' }).then(data => data.length && setCategories(data))
	}, []);

	const handleCategoryClick = (categoryID) => {
		setIds({});
		if (selectedCategory === categoryID) {
			setSelectedCategory(null);
		} else {
			setSelectedCategory(categoryID);
		}

		setIds({
			categoryID,
		});
	};

	return (
		<div className=' h-screen w-[283px] '>
			<h1 className='text-[28px] font-semibold mb-6'>Trending Items</h1>

			<div className='p-2 text-slate-600 font-normal space-y-1 '>
				<h3 onClick={() => { setIds({}) }} className='text-base font-semibold text-[#3E949A] p-[6px_8px] cursor-pointer'>
					All Category
				</h3>
				{categories?.map((item, index) => (
					<div className='space-y-1 p-[4px_8px]' key={index}>
						<button
							className={`flex items-center w-full justify-between focus:outline-none cursor-pointer `}
							onClick={() => handleCategoryClick(item.id)}
						>
							{item.name}
							{selectedCategory === item.id ? (
								<MdOutlineKeyboardArrowUp />
							) : (
								<MdOutlineKeyboardArrowDown />
							)}
						</button>
						{selectedCategory === item.id && (
							<ul className='pl-4 space-y-1 p-[4px_8px]'>
								{item?.subcategory?.map((subcategory, subIndex) => (
									<button
										onClick={() =>
											setIds({
												...ids,
												subcategoryID: subcategory.id,
											})
										}
										key={subIndex}
									>
										<li className='list-disc'>{subcategory.name}</li>
									</button>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ShopCategory;
