import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';

import rec1 from '../../../assets/verifications/1.png';
import rec2 from '../../../assets/verifications/2.png';
import rec3 from '../../../assets/verifications/3.png';
import star from '../../../assets/verifications/4.png';
import { plane } from '../../../contexts/terminal/Terminal';

const Verification = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const otp = Object.values(data).join('');
		plane.request({ name: 'verifyOTP', body: data }).then(data => data.status === false ? toaster({ type: 'error', message: data.message }) :
			navigate("/authentication/set-password", { state: { ...location.state, otp: otp } }))
		reset();
	};

	const handleKeys = (elmnt) => {
		if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
			const next = elmnt.target.tabIndex - 2;

			if (next > -1) {
				elmnt.target.form.elements[next].focus();
			}
		} else {
			const next = elmnt.target.tabIndex;
			if (next < 5) {
				elmnt.target.form.elements[next].focus();
			}
		}
	};

	// console.log(window.Clipboard);
	// async function copyTextToClipboard(text) {
	// 	if ('clipboard' in navigator) {
	// 		console.log('ache');
	// 		const a = await navigator.clipboard.readText();
	// 		console.log(a);
	// 	} else {
	// 		console.log('nai');
	// 		return document.execCommand('copy', true, text);
	// 	}
	// }

	return (
		<div className=' '>
			<div className='wrapper'>
				<div className='flex text-white items-center justify-center h-screen gap-[119px] '>
					<div className='flex-1'>
						<h1 className='text-[52px] font-semibold mb-3'>
							Enter your OTP verification code
						</h1>
						<p className='text-lg font-medium text-white/60 mb-12'>
							To get a verification code, first confirm the phone number you
							added to your account r••••••••@coredevs.ltd. Standard rates
							apply.
						</p>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex items-center gap-[10.75px]'>
								<InputField
									name='number1'
									maxLength={1}
									type='text'
									errors={errors}
									register={register}
									required={true}
									onKeyUp={handleKeys}
									tabIndex={1}
									className='border-none focus:shadow-none text-center'
								/>
								<InputField
									name='number2'
									maxLength={1}
									type='text'
									errors={errors}
									register={register}
									required={true}
									onKeyUp={handleKeys}
									tabIndex={2}
									className='border-none focus:shadow-none text-center'
								/>
								<InputField
									name='number3'
									type='text'
									maxLength={1}
									errors={errors}
									register={register}
									required={true}
									onKeyUp={handleKeys}
									tabIndex={3}
									className='border-none focus:shadow-none text-center'
								/>
								<InputField
									name='number4'
									type='text'
									maxLength={1}
									errors={errors}
									register={register}
									required={true}
									onKeyUp={handleKeys}
									tabIndex={4}
									className='border-none focus:shadow-none text-center'
								/>
							</div>

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
						<div className='space-y-[26px]'>
							<img src={rec1} alt='' />
							<img src={rec2} alt='' />
							<img src={rec3} alt='' />
						</div>
						<img src={star} alt='' className='mt-12' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verification;
