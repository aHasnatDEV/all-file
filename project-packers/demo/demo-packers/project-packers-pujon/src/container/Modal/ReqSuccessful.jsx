import React from 'react';
import successFull from '../../assets/successful.png';
import internet from '../../assets/icons/cd-internet.svg';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const ReqSuccessful = () => {
	return (
		<div className='md:w-[536px] md:h-[494px] '>
			<div className='md:p-[30px]'>
				<div className='flex flex-col items-center justify-center mb-16'>
					<img src={successFull} alt='' className='mb-12' />
					<div className='text-xl font-semibold mb-2 text-[#124E58]'>
						Item request successful!
					</div>
					<p className='text-center w-[353px]'>
						We will review it and get your back within next 24 hourts in your
						email and project notification. Also you can see update in your{' '}
						<Link to='/home/cart'>Cart</Link>
					</p>
				</div>

				<div className='flex flex-col justify-start'>
					<div className=''>
						<label htmlFor='productName' className='text-base font-medium'>
							Request and search another item
						</label>
						<div className='flex items-center gap-1 mt-3 mb-5'>
							<div className='w-full flex py-3 px-5 rounded-50 gap-1 items-center text-ellipsis truncate border bg-white'>
								<img src={internet} alt='' />
								<input
									type='text'
									id='productName'
									name='productName'
									className='relative m-0 block flex-auto bg-transparent bg-clip-padding  text-base font-normal  outline-none '
									placeholder='Paste the URL of the product'
								/>
							</div>
						</div>
						<Button
							buttonType='secondaryButton'
							name='Search'
							className='py-[17px] px-[20px] w-full '
						></Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReqSuccessful;
