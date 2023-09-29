import React from 'react';
import sortButton from '../../assets/icons/sort-data.svg';
import fillterButton from '../../assets/icons/fillter.svg';
const TableFunctions1 = ({ buttons, selectedButton, onClick, onChange }) => {
	console.log(buttons);
	return (
		<div>
			<div className='flex justify-between mt-5'>
				{/* tab buttonns */}
				<div>
					<ul className='flex gap-[2px]'>
						{buttons.map((button, i) => (
							<button
								key={i}
								onClick={onClick}
								value={button.value}
								className={`p-[8px_12px] cursor-pointer ${
									selectedButton === button.value ? 'bg-[#CFF6EF] rounded' : ''
								}`}
							>
								{button.name}
							</button>
						))}
					</ul>
				</div>

				<>
					<div className='flex items-center gap-2 justify-end '>
						{/* search */}
						<div
							className={`w-auto md:w-2/4 lg:w-3/5 flex px-3 items-center text-ellipsis truncate rounded border bg-transparent border-slate-200  `}
						>
							{/* search Icon */}
							<span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className={`h-5 w-5  
										 text-[#5C5F62] `}
								>
									<path
										fillRule='evenodd'
										d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
										clipRule='evenodd'
									/>
								</svg>
							</span>

							{/* search input */}
							<input
								type='search'
								onChange={onChange}
								className='relative m-0 block flex-auto bg-transparent bg-clip-padding ps-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-600 outline-none placeholder:text-slate-600'
								placeholder='Search'
							/>
						</div>

						<button className='p-[5px] rounded border border-slate-200 '>
							<img src={fillterButton} alt='' />
						</button>
						<button className='p-[5px] rounded border border-slate-200 '>
							<img src={sortButton} alt='' />
						</button>
					</div>
				</>
			</div>
		</div>
	);
};

export default TableFunctions1;
