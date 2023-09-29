import React from 'react';
import OverviewCard from '../../../components/OverviewCard/OverviewCard';

const Overview = () => {
	return (
		<>
			<div className='flex items-center justify-between py-5 border-b'>
				<OverviewCard
					title='Total Cost'
					amount='10440.2'
					details='New cost last 30 days'
				/>
				<hr className='border border-slate-200 w-[1px] h-[76px] bg-orange-400' />
				<OverviewCard
					title='Total Request'
					amount='298'
					details='New Request last 30 days'
				/>
				<hr className='border border-slate-200 w-[1px] h-[76px]' />
				<OverviewCard
					title='Total Order'
					amount='128'
					details='New order last 30 days'
				/>
				<hr className='border border-slate-200 w-[1px] h-[76px]' />
				<OverviewCard
					title='Completed'
					amount='100'
					details='Completed order last 30 days'
				/>
				<hr className='border border-slate-200 w-[1px] h-[76px]' />
				<OverviewCard
					title='Canceled'
					amount='28'
					details='Canceld order last 30 days'
				/>
			</div>
		</>
	);
};

export default Overview;
