import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @param {string} id - receive number specific element if any to show is heading
 * @param {string} name- receive page name if any
 * @param {string} buttonName - receive page buttonName to show what action it will do
 * @returns
 */

const PreviousButtonHeading = ({ id, name, buttonName }) => {
	return (
		<div className='flex items-center gap-4'>
			<Link to={-1} className='p-2 border rounded'>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M5 12.0002L20 12'
						stroke='#64748B'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M8.99992 7L4.70703 11.2929C4.37369 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.37369 12.3738 4.70703 12.7071L8.99992 17'
						stroke='#64748B'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</Link>
			<div>
				{buttonName && (
					<p className='text-sm font-normal text-slate-600'>{buttonName}</p>
				)}
				{id && <p className='text-xl font-semibold text-[#0D3D4B]'>#{id}</p>}
				{name && <p className='text-xl font-semibold text-[#0D3D4B]'>{name}</p>}
			</div>
		</div>
	);
};

export default PreviousButtonHeading;
