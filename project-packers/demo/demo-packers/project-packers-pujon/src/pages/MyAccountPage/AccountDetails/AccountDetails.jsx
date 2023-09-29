import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import { plane } from '../../../contexts/terminal/Terminal';
import removeEmptyFields from '../../../utils/removeEmptyFields';
import toaster from '../../../utils/toaster';

const AccountDetails = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const [user, setUser] = useState()

	let error = null;
	useEffect(() => {
		plane.request({ name: 'getOwn' }).then(data => {
			if (data.id) {
				setUser(data)
			}
		})
	}, [])

	useEffect(() => {
		if (user) {
			setValue('fullName', user?.fullName, { shouldValidate: true })
			setValue('phone', user?.phone, { shouldDirty: true })
		}
	}, [user, setValue])

	const onSubmit = (data) => {
		removeEmptyFields(data)
		delete data.email
		if (data.newPassword) {
			if (data.newPassword !== data.confirmPassword) {
				return error = <p className='text-red-500 font-semibold'>Password does not match</p>
			}
			data = {
				...data,
				passwordChange: {
					oldPass: data.currentPassword,
					newPass: data.newPassword
				}
			}
			delete data.newPassword
			delete data.currentPassword
			delete data.confirmPassword
			return error = null
		}
		plane.request({ name: 'updateOwnProfile', body: { data } }).then(data => {
			if (data.id) {
				setUser(data)
				toaster({ type: 'success', message: 'Profile Updated Successfully!!' })
			}
		})
	};
	return (
		<div className='w-full md:w-[699px]  '>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				{/* name */}
				{/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<InputField
						placeholder='Enter your first name'
						name='fullName'
						type='text'
						errors={errors}
						register={register}
						required={true}
						label='First Name'
						neededFor='homepage'
					/>
					<InputField
						placeholder='Enter your last name'
						name='lastName'
						type='text'
						errors={errors}
						register={register}
						required={true}
						label='Last Name'
						neededFor='homepage'
					/>
				</div> */}
				{/* Full Name */}
				<InputField
					placeholder='Enter your first name'
					name='fullName'
					type='text'
					errors={errors}
					register={register}
					required={true}
					label='First Name'
					neededFor='homepage'
				/>
				{/* Email */}
				<InputField
					placeholder='Enter your email address'
					name='email'
					type='email'
					value={user?.email}
					errors={errors}
					register={register}
					required={true}
					label='Email Address'
					neededFor='homepage'
				/>
				{/* Phone number */}
				<InputField
					placeholder='Enter your phone Number'
					name='phone'
					label='Phone Number'
					register={register}
					required={true}
					errors={errors}
					neededFor='homepage'
				/>
				<h3>Password Change</h3>
				{/* Current Password */}
				<InputField
					placeholder='**********'
					name='currentPassword'
					type='password'
					errors={errors}
					register={register}
					label='Current Password'
					neededFor='homepage'
				/>
				{/* New Password */}
				<InputField
					placeholder='**********'
					name='newPassword'
					type='password'
					errors={errors}
					register={register}
					label='New Password'
					neededFor='homepage'
				/>
				{/* Confirm new password */}
				<InputField
					placeholder='**********'
					name='confirmPassword'
					type='password'
					errors={errors}
					register={register}
					label='Confirm New Password'
					neededFor='homepage'
				/>
				<Button
					buttonType='secondaryButton'
					name='Save Change'
					className='p-[12px_32px]'
				/>
			</form>
		</div>
	);
};

export default AccountDetails;
