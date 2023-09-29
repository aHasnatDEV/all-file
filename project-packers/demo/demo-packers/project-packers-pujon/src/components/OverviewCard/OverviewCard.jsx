import React from 'react';

/**
 *
 * @param {string} title -  receive title for showing what kind of overview is it. It can be "Total Cost", "Total Request", "Total Order", "Completed", "Canceled"
 * @param {number} amount - receive amount ffor showing number of each card
 * @param {string} details - receive details for showing small details about card
 * @returns
 */

const OverviewCard = ({ title, amount, details }) => {
	return (
		<div>
			<div className='min-w-[10px]'>
				<p className='text-sm font-medium text-slate-600'>{title}</p>
				<div className='text-xl font-semibold text-[#0D3D4B] flex items-center'>
					{title.toLowerCase() === 'total cost' && <>৳{amount}k</>}

					{title.toLowerCase() !== 'total cost' && (
						<>
							{amount}
							<div
								className={` w-2 h-2 rounded-full ms-1 ${
									title.toLowerCase() === 'canceled'
										? 'bg-red-500 '
										: title.toLowerCase() === 'total order'
										? ' bg-[#F2C852]'
										: title.toLowerCase() === 'completed'
										? ' bg-[#16A34A]'
										: 'bg-[#A2EEE7]'
								}`}
							></div>
						</>
					)}
				</div>
				<p className='text-xs font-medium text-slate-400'>{details}</p>
			</div>
		</div>
	);
};

export default OverviewCard;
