import React from 'react';

/**
 *
 * @param {string} title - receive status = "Close", "Refund Processing", "Paid", "Abandoned", "Pending", "Processing", "Completed", "Estimate Sent"
 * @returns
 */
const Status = ({ title }) => {
	// console.log(title === 'Close' || 'Refund Processing');

	return (
		<>
			<div
				className={`flex items-center justify-center gap-1 rounded-[10px] text-sm font-normal py-[2px] ps-[6px] pe-2 w-fit ${
					title.toLowerCase() === 'close' ||
					title.toLowerCase() === 'refund processing'
						? 'bg-red-200 '
						: title.toLowerCase() === 'paid' ||
						  title.toLowerCase() === 'abandoned'
						? ' bg-slate-200'
						: title.toLowerCase() === 'pending' ||
						  title.toLowerCase() === 'processing'
						? ' bg-[#F7DA7C]'
						: title.toLowerCase() === 'completed'
						? 'bg-green-300'
						: 'bg-[#A2EEE7]'
				}`}
			>
				<div
					className={` w-2 h-2 rounded-full ${
						title.toLowerCase() === 'close' ||
						title.toLowerCase() === 'refund processing'
							? 'bg-red-700'
							: title.toLowerCase() === 'paid' ||
							  title.toLowerCase() === 'abandoned'
							? ' bg-slate-700'
							: title.toLowerCase() === 'pending' ||
							  title.toLowerCase() === 'processing'
							? ' bg-[#8C651A]'
							: title.toLowerCase() === 'completed'
							? ' bg-green-700'
							: 'bg-[#092F3F]'
					}`}
				></div>

				{title.toLowerCase() === 'refund processing' ? (
					'Processing'
				) : title.toLowerCase() === 'sent' ? (
					'Estimate Sent'
				) : (
					<> {title[0].toUpperCase() + title.slice(1)}</>
				)}
			</div>
		</>
	);
};

export default Status;
