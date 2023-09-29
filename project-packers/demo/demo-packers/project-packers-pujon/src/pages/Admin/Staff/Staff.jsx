import React from 'react';
import Button from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import StaffCard from '../../../components/StaffCard/StaffCard';
import staff from '../../../assets/Blog1.png';
import { useForm } from 'react-hook-form';
import removeEmptyField from '../../../utils/removeEmptyFields';
import AddNewStaff from '../../../container/AdminContainer/Staff/AddNewStaff';

const Staff = () => {
	return (
		<div>
			{/* title */}
			<div className='flex items-center justify-between border-b'>
				<h2 className='p-[20px_0]   w-full text-[#0D3D4B] text-xl font-semibold'>
					Staff
				</h2>
				<Link to='/admin/addDiscount'>
					<Button
						buttonType='secondaryButton'
						name='Update'
						className='rounded-[5px] w-[200px] '
					/>
				</Link>
			</div>

			{/*  */}
			<div className=' my-5 flex items-end '>
				<div className='flex-1'>
					{' '}
					<h2 className='text-base font-semibold text-[#0D3D4B] mb-3'>
						Account and permission
					</h2>
					<p className='text-sm font-normal text-slate-500'>
						We can help with that Replace your next meeting with a short video
						and get feedback faster .
					</p>
				</div>
				<h2 className='text-[#0D3D4B] text-base font-semibold mt-2 mb-3 flex-1'>
					Add Add New Staff
				</h2>
			</div>

			<div className='flex gap-5 items-start'>
				<div className='flex-1'>
					{/* admin */}
					<div className='p-3 border rounded mb-3'>
						<p className=' px-5 py-4 text-base font-semibold'>Account Owner</p>
						<div className='flex items-center gap-3  px-5 py-4'>
							<div>
								<img src={staff} alt='' className='w-10 h-10 rounded-full' />
							</div>
							<div className='space-y-1'>
								<p className='text-sm font-semibold'>Pujon Das Auvi</p>
								<p className='text-sm font-normal text-[#6D7175]'>
									Super Admin
								</p>
							</div>
						</div>
					</div>

					{/* staff */}
					<div className='border p-3 rounded'>
						<div className='flex items-center justify-between  px-5 py-4'>
							<p className=' text-base font-semibold'>Staff accounts </p>
							<p className='text-[#3E949A]  text-sm font-normal'>
								log out all staff accounts
							</p>
						</div>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
						<StaffCard
							role='support'
							image={staff}
							name='Pujon Das'
							access='Full access'
						/>
					</div>
				</div>
				<div className='flex-1'>
					<AddNewStaff />
				</div>
			</div>
		</div>
	);
};

export default Staff;
