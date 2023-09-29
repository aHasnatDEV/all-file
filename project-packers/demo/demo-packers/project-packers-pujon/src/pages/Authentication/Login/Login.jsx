import React, { useContext } from 'react';
// import InputField from '../../components/InputField/InputField';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';

// socialMedia
import facebook from '../../../assets/SocialMedia/facebook.png';
import apple from '../../../assets/SocialMedia/apple.png';
import google from '../../../assets/SocialMedia/google.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import { plane } from '../../../contexts/terminal/Terminal';
import toaster from '../../../utils/toaster';
import { UserContext } from '../../../contexts/user/UserContext';

const Login = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const location1 = useLocation();
	const requestItemData = location1.state?.requestItem;
	const sendRequest = location1.state?.sendRequest;

	// userContext
	const { Login, setUserId } = useContext(UserContext);

	// check path where user want to go after login
	const path = location1?.state?.location
		? location1?.state?.location
		: '/home';

	// form submit
	const onSubmit = (data) => {
		// set data if remember me clicked or not
		data = data.rememberMe
			? data
			: { email: data.email, password: data.password };

		// hit login api with data
		Login(data).then((data) => {
			setUserId(data.id);

			// check is loggedIn successful or not
			if (data.status === false) {
				// show toaster
				toaster({ type: 'error', message: data.message });
			} else {
				// check does login page need hit any api after login or not
				if (sendRequest) {
					const { images, ...rest } = requestItemData;

					// hitting api for register request
					plane
						.request({
							name: 'registerRequest',
							body: { data: rest, images: images },
						})
						.then((d) => {
							// console.log('item request response from login', d);
							navigate('/home', { state: true });
						});
				} else {
					navigate(path);
				}
			}
		});

		reset();
	};

	return (
		<div className=' '>
			<div className='wrapper'>
				<div className='flex text-white items-center justify-center h-screen gap-[119px] '>
					<div className='flex-1'>
						<h1 className='text-[52px] font-semibold mb-[30px]'>
							Welcome Back
						</h1>

						{/* login form */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-5'>
								<InputField
									placeholder='Enter your email address'
									name='email'
									type='email'
									errors={errors}
									register={register}
									required={true}
									label='Email address/Phone Number'
								/>
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
											{...register('rememberMe')}
										// className=''
										/>
										<label htmlFor='remember' className='ml-1'>
											Remember me
										</label>
									</div>
									<Link
										to='/authentication/identify'
										className='text-[#F2C852] text-base font-normal'
									>
										Forgot your password
									</Link>
								</div>
							</div>

							<div className='flex items-center gap-2 mt-12'>
								<a href="http://localhost:4000/api/login/google">
									<Button buttonType='imageButton' image={google} className='' />
								</a>
								<a href="http://localhost:4000/api/login/google">

									<Button
										buttonType='imageButton'
										image={facebook}
										className=''
									/>
								</a>
								<Button buttonType='imageButton' image={apple} className='' />

								<Button
									buttonType='secondaryButton'
									name='Login'
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

export default Login;
