import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';

// socialMedia
import facebook from '../../../assets/SocialMedia/facebook.png';
import apple from '../../../assets/SocialMedia/apple.png';
import google from '../../../assets/SocialMedia/google.png';
// import facebook from "../../../"
import { Link, useNavigate } from 'react-router-dom';
import { plane } from '../../../contexts/terminal/Terminal';

const SignUp = () => {
	const navigate = useNavigate();
	const [accept, setAccept] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		plane.request({ name: 'registerUser', body: data }).then(data => data.status === false ? toaster({ type: 'error', message: data.message }) :
			navigate("/authentication/login"))
		reset();
	};

	return (
		<div className=' '>
			<div className='wrapper'>
				<div className='flex flex-row-reverse text-white items-center justify-center h-screen gap-[119px] '>
					<div className='flex-1'>
						<h1 className='text-[52px] font-semibold mb-[30px]'>Sign up</h1>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-5'>
								<InputField
									placeholder='Enter your full name'
									name='fullName'
									type='text'
									errors={errors}
									register={register}
									required={true}
									label='Full Name'
								/>

								<InputField
									placeholder='Enter your email address'
									name='email'
									type='email'
									errors={errors}
									register={register}
									required={true}
									label='Email address'
								/>

								<InputField
									placeholder='Enter your phone Number'
									name='phone'
									label='Phone Number'
									register={register}
									required={true}
									errors={errors}
								/>

								{/* <InputField
									placeholder='4437727843***'
									name='phoneNumber'
									id='phone'
									type='tel'
									errors={errors}
									register={register}
									required={true}
									label='Phone Number'
								/> */}
								<InputField
									placeholder='******'
									name='password'
									type='password'
									errors={errors}
									register={register}
									required={true}
									label='Password'
								/>

								<div className=' flex items-center justify-between'>
									<div>
										<input
											type='checkbox'
											name='remember'
											id='remember'
											onChange={() => setAccept(!accept)}
										// className=''
										/>
										<label htmlFor='remember' className='ml-1'>
											I agree to Project Packers{' '}
											<span className='text-[#F2C852] text-base font-normal'>
												Terms of Service
											</span>{' '}
											and{' '}
											<span className='text-[#F2C852] text-base font-normal'>
												{' '}
												Privacy notice
											</span>
										</label>
									</div>
								</div>
							</div>

							<div className='flex items-center gap-2 mt-12'>
								<Button buttonType='imageButton' image={google} className='' />
								<Button
									buttonType='imageButton'
									image={facebook}
									className=''
								/>
								<Button buttonType='imageButton' image={apple} className='' />

								<Button
									dis={accept}
									buttonType='secondaryButton'
									name='Sign up'
									className='w-full py-[17px] px-5 '
								>
									<input type='submit' />
								</Button>
							</div>
						</form>
					</div>
					<div className='h-[512px] border-s border-white/10'></div>
					<div className='flex-1'>
						<p className='text-2xl font-medium'>
							User original product shopping experience made easy and fun
						</p>
						<p className='text-base font-normal mt-5'>
							Already have an account yet?
							<Link className='text-[#F2C852]' to='/authentication/login'>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
