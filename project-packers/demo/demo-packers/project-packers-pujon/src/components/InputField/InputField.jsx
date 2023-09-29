import React from 'react';
import { useForm } from 'react-hook-form';
import { BsExclamation } from 'react-icons/bs';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import './InputField.css';

/**
 *
 * @param {string} value - receive value of input field
 * @param {string} type - receive type of input field
 * @param {string} placeholder - receive placeholder for input field
 * @param {string} label - receive label for input field
 * @param {string} name - receive name for input field
 * @param {string} className - receive class name for extra style for input field
 * @param {function} register - receive register function for save input value in useForm
 * @param {function} errors - receive error function for show error message
 * @param {boolean} required - receive required true or not
 * @param {Function} eventHandler - receive event handler
 * @returns
 */
const InputField = ({
	value,
	type,
	name,
	label,
	register,
	required,
	errors,
	className,
	placeholder,
	id,
	maxLength,
	tabIndex,
	neededFor,
	...eventHandler
}) => {
	return (
		<>
			<div className='relative flex gap-2 flex-col '>
				{label && (
					<label
						htmlFor={name}
						className={` ${
							neededFor === 'homePage'
								? 'text-base font-normal text-black'
								: 'adminPages'
								? 'text-sm font-normal'
								: 'text-lg font-semibold text-white'
						} `}
					>
						{label}
					</label>
				)}
				{name === 'phone' || name === 'alternativephone' ? (
					<>
						<PhoneInput
							placeholder={placeholder}
							// value={value}
							// onChange={setValue}
							defaultCountry='BD'
							international
							className={` w-full border-2 text-sm font-medium bg-white rounded-50  text-[#124E58] ${
								neededFor === 'homePage'
									? 'px-[20px] py-[12px] border-[#000316]/5'
									: 'adminPages'
									? 'px-[12px] py-[8px] border-slate-200 text-black'
									: 'px-[20px] py-[17px] caret-[#F2C852] border-[#F2C852] focus:shadow-[0px_0px_10px_0px_#F2C852]'
							} placeholder:text-[#124E58] ${className}
							${errors[name] && 'focus:border-red-600 focus:shadow-none'}
							`}
							{...register(name)}
						/>
					</>
				) : (
					<input
						id={id && id}
						value={value}
						name={name}
						type={type}
						tabIndex={tabIndex && tabIndex}
						maxLength={maxLength && maxLength}
						{...register(name, { required })}
						{...eventHandler}
						placeholder={placeholder && placeholder}
						className={` w-full border-2 text-sm font-medium bg-white rounded-50  text-[#124E58] ${
							neededFor === 'homePage'
								? 'px-[20px] py-[14px] border-[#000316]/5'
								: 'adminPages'
								? 'px-[12px] py-[8px] border-slate-200 text-black'
								: 'px-[20px] py-[17px] caret-[#F2C852] border-[#F2C852] focus:shadow-[0px_0px_10px_0px_#F2C852]'
						} placeholder:text-[#124E58] ${className}
						${errors[name] && 'focus:border-red-600 focus:shadow-none'}
						`}
					/>
				)}
				{errors[name] && (
					<div className='absolute right-0 -bottom-6'>
						<span className='bg-red-600 py-[2px] px-3 rounded-50  text-white flex items-center justify-end gap-1 text-xs font-medium'>
							<BsExclamation className='text-sm bg-white text-red-600 rounded-50' />{' '}
							Please enter your {label}
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default InputField;
