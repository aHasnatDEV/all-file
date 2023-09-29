import React, { useContext, useState } from 'react';
import ReloadImg from '../../assets/cd-reload.svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import internet from '../../assets/icons/cd-internet.svg';
import { useForm } from 'react-hook-form';
import UploadImages from '../../components/UploadImages/UploadImages';
import QuantityUpdate from '../../components/QuantityUpdate/QuantityUpdate';
import { UserContext } from '../../contexts/user/UserContext';
import { plane } from '../../contexts/terminal/Terminal';

const CreateReqModal = ({ setShowModal, setShowModal2, reqURL, setReqURL }) => {
	const [productImage, setProductImage] = useState(false);
	const navigate = useNavigate();

	const { userId: loggedIn } = useContext(UserContext);

	const { handleSubmit, register, reset } = useForm();

	const onSubmit = (data) => {
		const { images, ...rest } = data;
		console.log('outSide', rest);

		if (loggedIn) {
			plane
				.request({
					name: 'registerRequest',
					body: { data: rest, images: images },
				})
				.then((d) => {
					setShowModal(false);
					setShowModal2(true);
				});

			// console.log('inSide', data);
		} else {
			navigate('/authentication/login', {
				state: { requestItem: data, sendRequest: true },
			});
		}
		reset();
	};

	return (
		<>
			<div className=' md:w-[596px] md:h-[658px] md:p-[30px] '>
				{/* button */}
				<div className='flex items-center gap-4 justify-start text-base font-semibold'>
					<h1 className='font-semibold text-xl'>Request Item</h1>
					<button
						className={`border text-base px-5 py-[5px] rounded-50 ${
							!productImage && 'bg-[#CFF6EF] '
						}`}
						onClick={() => setProductImage(false)}
					>
						Link
					</button>
					<button
						className={`border text-base px-5 py-[5px] rounded-50 ${
							productImage && 'bg-[#CFF6EF] '
						} `}
						onClick={() => setProductImage(true)}
					>
						Images
					</button>
				</div>
				<hr className='my-2' />

				<form className='space-y-[10px]' onSubmit={handleSubmit(onSubmit)}>
					{/* Product Images */}
					<div
						className={`flex ${
							productImage ? 'opacity-100' : 'opacity-0  h-0  '
						} transition-all duration-1000 ease-in-out`}
					>
						<UploadImages register={register} />
					</div>

					{/* details */}
					<div
						className={`z-30  ${
							!productImage
								? 'opacity-100  translate-y-0'
								: 'opacity-0  h-0 translate-y-96 '
						} transition-all duration-1000 ease-in-out`}
					>
						{/* Product link */}
						<div className='space-y-[10px] py-2'>
							<label htmlFor='productLink'>Product Link </label>
							<div className='flex items-center gap-1'>
								<div className='w-full flex py-3 px-5 gap-1 rounded-50 items-center text-ellipsis truncate border bg-white'>
									<img src={internet} alt='' />
									<input
										type='search'
										defaultValue={reqURL}
										id='productLink'
										name='productLink'
										onChange={(e) => {
											setReqURL(e.target.value);
											register('link', { value: e.target.value });
										}}
										className='relative m-0 block flex-auto bg-transparent bg-clip-padding text-base font-normal   outline-none placeholder:text-[#000]'
										placeholder='Paste the URL of the product'
										required
									/>
								</div>

								<button
									onClick={(e) => {
										e.preventDefault();
										setReqURL('');
									}}
								>
									<img
										src={ReloadImg}
										alt=''
										className='bg-gray-100 p-3 rounded-full'
									/>
								</button>
							</div>
						</div>

						{/* product name */}
						<div className='space-y-[10px]'>
							<label htmlFor='productName'>Product Name </label>
							<div className='flex items-center gap-1'>
								<div className='w-full flex py-3 px-5 rounded-50 gap-1 items-center text-ellipsis truncate border bg-white'>
									<input
                  required
										type='text'
										id='productName'
										{...register('name')}
										className='relative m-0 block flex-auto bg-transparent bg-clip-padding  text-base font-normal outline-none placeholder:text-[#000]'
										placeholder='Paste the URL of the product'
									/>
								</div>
							</div>
						</div>
					</div>

					{/* quantity */}
					<div className='space-y-[10px]'>
						<label htmlFor='quantity'>Quantity </label>
						<div className='flex items-center gap-5'>
							<QuantityUpdate prevQuantity={1} register={register} />
							<p className='font-medium text-base text-gray-400'>
								By
								<a href='amazon.com' className='underline ml-2 text-[#6EAFB3]'>
									amazon.com
								</a>
							</p>
						</div>
					</div>

					{/* add a note */}
					<div className='flex flex-col gap-[10px]'>
						<label htmlFor='addNote'>
							Add a note <span>(optional)</span>
						</label>
						<textarea
							name='addNote'
							id='addNote'
							cols='30'
							rows='5'
							{...register('note')}
							className='border outline-none py-3 px-5 rounded-lg'
							placeholder='Specify size, color, model or any instructions here...'
						></textarea>
					</div>

					{/* send request button */}

					<Button
						buttonType='secondaryButton'
						name={`${
							loggedIn ? 'Create Request' : 'Login and Request your item'
						}`}
						className=' w-full px-xl py-[17px]'
					>
						<input type='submit' />
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateReqModal;
