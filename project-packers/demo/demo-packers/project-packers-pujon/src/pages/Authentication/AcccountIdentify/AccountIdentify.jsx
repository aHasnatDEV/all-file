import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import { plane } from '../../../contexts/terminal/Terminal';
import toaster from '../../../utils/toaster';

const AccountIdentify = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		plane.request({ name: 'sendOTP', body: data }).then(data => data.status === false ? toaster({ type: 'error', message: data.message }) :
			navigate("/authentication/verification", { state: { ...data, time: Date.now() } }))
		reset();
	};

	return (
		<div className=' '>
			<div className='wrapper'>
				<div className='flex text-white items-center justify-center h-screen gap-[119px] '>
					<div className='flex-1'>
						<h1 className='text-[52px] font-semibold mb-4'>Account Recovery</h1>
						<p className='text-lg font-medium text-white/60 mb-12'>
							Enter the email address or phone number associated with your
							account, and we will email you a link to reset your password.
						</p>

						<form onSubmit={handleSubmit(onSubmit)}>
							<InputField
								placeholder='Enter your email address or phone number'
								name='email'
								type='email'
								errors={errors}
								register={register}
								required={true}
								label='Email or Phone Number'
							/>

							<Button
								buttonType='secondaryButton'
								name='Reset Password'
								className='w-full py-[17px] px-5 mt-5'
							>
								<input type='submit' />
							</Button>
						</form>
					</div>
					<div className='h-[512px] border-s border-white/10'></div>
					<div className='flex-1'>
						<p className='text-2xl font-medium'>
							Log in to access your Project Packers Platform for order your
							products from any USA website.
						</p>
						<p className='text-base font-normal mt-5'>
							Don't have an account yet?
							<Link className='text-[#F2C852]' to='/authentication/signup'>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountIdentify;
