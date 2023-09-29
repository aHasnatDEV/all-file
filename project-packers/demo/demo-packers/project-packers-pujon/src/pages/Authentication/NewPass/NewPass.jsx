import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';

import img1 from '../../../assets/verifications/5.png';
import { plane } from '../../../contexts/terminal/Terminal';

const NewPass = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	let error = null;
	const navigate = useNavigate()
	const onSubmit = (data) => {
		if (data.newPassword !== data.confirmPassword) {
			return error = <p className='text-red-500 font-semibold'>Password does not match</p>
		}
		plane.request({ name: 'resetPassword', body: data }).then(data => data.status === false ? toaster({ type: 'error', message: data.message }) :
			navigate("/authentication/login"))
		error = null
		reset();
	};

	return (
		<div className=' '>
			<div className='wrapper'>
				<div className='flex text-white items-center justify-center h-screen gap-[119px] '>
					<div className='flex-1'>
						<h1 className='text-[52px] font-semibold mb-12'>
							Enter your OTP verification code
						</h1>

						<form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
							<InputField
								name='newPassword'
								label='New Password'
								type='password'
								errors={errors}
								register={register}
								required={true}
								className='border-none focus:shadow-none '
							/>
							<InputField
								name='confirmPassword'
								label='Confirm Password'
								type='password'
								errors={errors}
								register={register}
								required={true}
								className='border-none focus:shadow-none '
							/>
							{error && error}
							<Button
								buttonType='secondaryButton'
								name='Save Password'
								className='w-full py-[17px] px-5 mt-5'
							>
								<input type='submit' />
							</Button>
						</form>
					</div>
					<div className='h-[512px] border-s border-white/10'></div>
					<div className='flex-1'>
						<img src={img1} alt='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPass;
