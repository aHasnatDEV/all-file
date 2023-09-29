import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { plane } from '../../contexts/terminal/Terminal';
import { useSearchParams } from 'react-router-dom';
import OrderSuccessModal from '../../container/Modal/OrderSuccessModal';
import Modal from '../../components/Modal/Modal';

const Checkout = () => {
	let totalPrice = 0;
	const [cart, setCart] = useState();
	const [discount, setDiscount] = useState();
	const [price, setPrice] = useState()
	const [inside, setInside] = useState(true)
	const [orderModal, setOrderModal] = useState(false);
	const [searchParams] = useSearchParams();
	const orderqueries = searchParams.get('order');
	let orderstatus = orderqueries?.split('?')[0]
	let orderid = orderqueries?.split('?')[1]

	useEffect(() => {
		plane.request({ name: 'getCart' }).then(data => {
			if (data.id) {
				setCart(data);
				if (data.discountApplied) setDiscount(data.discountApplied);
			}
		})
		if (orderstatus === 'success') {
			setOrderModal(true)
		}
	}, [orderstatus]);

	useEffect(() => {
		let discountItemsTotal = 0;
		let nondiscountItemsTotal = 0;
		let discountamount = 0;
		let totalPrice = 0;
		if (cart) {
			cart.products.forEach(product => {
				const total = (product.product.price + product.product.tax + product.product.fee) * product.productQuantity;
				if (discount?.code && product.product.category.toString() === discount.category && product.product.subcategory.toString() === discount.subcategory) {
					discountItemsTotal += total;
				} else {
					nondiscountItemsTotal += total;
				}
			});
			discountamount = discount?.percentage ? (discountItemsTotal * discount.percentage) / 100 : discount?.amount;
			totalPrice = discountamount ? totalPrice + nondiscountItemsTotal - discountamount : totalPrice + nondiscountItemsTotal;
			totalPrice = inside ? totalPrice + 99 : totalPrice + 150
			setPrice(totalPrice);
		}
	}, [cart, discount, inside]);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const body = {
			email: data.email,
			phone: data.phone,
			alternativephone: data.alternativephone.length > 4 ? data.alternativephone : null,
			instructions: data.instructions,
			insideDhaka: data.insideDhaka,
			shippingaddress: {
				name: data.firstName + ' ' + data.lastName,
				address: data.address,
				city: data.city,
				area: data.area,
				zip: data,
			}
		}
		// plane.request({ name: 'registerOrder', body }).then(data => data.url && window.location.replace(url))
		// reset();
	};

	return (
		<div className='md:min-h-screen mt-12 mb-20'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='wrapper flex flex-col md:flex-row  gap-[30px] justify-between'
			>
				<div className='w-full md:w-[691px]'>
					<h3 className='mb-6 text-lg font-medium text-[#0D3D4B]'>
						Contact Information
					</h3>
					<div className='space-y-4'>
						{/* Email address */}
						<InputField
							placeholder='Enter your email address'
							name='email'
							type='email'
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
						{/* Alternative phone number (Optional) */}
						<InputField
							placeholder='Enter your phone Number'
							name='alternativephone'
							label='Alternative phone number (Optional)'
							register={register}
							required={true}
							errors={errors}
							neededFor='homepage'
						/>
					</div>

					{/* Shipping Address */}
					<h3 className='mb-6 text-lg font-medium text-[#0D3D4B]'>
						Shipping address
					</h3>
					<div className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{/* First Name */}
							<InputField
								placeholder='Enter your first name'
								name='firstName'
								type='text'
								errors={errors}
								register={register}
								required={true}
								label='First Name'
								neededFor='homepage'
							/>
							{/* Last Name */}
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
						</div>
						{/* address */}
						<InputField
							placeholder='Enter your address'
							name='address'
							type='text'
							errors={errors}
							register={register}
							required={true}
							label='Address'
							neededFor='homepage'
						/>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							{/* city */}
							<InputField
								placeholder='city'
								name='city'
								type='text'
								errors={errors}
								register={register}
								required={true}
								label='City'
								neededFor='homepage'
							/>
							{/* area */}
							<InputField
								placeholder='area'
								name='area'
								type='text'
								errors={errors}
								register={register}
								required={true}
								label='Area'
								neededFor='homepage'
							/>
							{/* Zip Code */}
							<InputField
								placeholder='zip code'
								name='zipCode'
								type='text'
								errors={errors}
								register={register}
								required={true}
								label='Zip Code'
								neededFor='homepage'
								className="appearance-none"
							/>
						</div>
						{/* Delivery Instruction */}
						<div className='flex flex-col'>
							<label htmlFor='deliveryInstruction'>
								Delivery Instruction (Optional)
							</label>
							<textarea
								name='deliveryInstruction'
								{...register('deliveryInstruction')}
								id='deliveryInstruction'
								cols='30'
								rows='5'
								className={`rounded- [4px] p-[14px_20px] border border-slate-200  outline-none text-[#124E58]`}
							></textarea>
						</div>
					</div>
				</div>
				{/* right side */}
				<div className='w-full md:w-[492px] p-5 border rounded-[8px] h-full '>
					<h3 className='text-xl font-medium text-[#0D3D4B] py-4 border-b'>
						Your Order
					</h3>
					{/* Products details */}
					<div>
						<div className='flex items-center justify-between border-b pt-4 pb-2 text-base font-semibold '>
							<p className='text-start'>Product</p>
							<p className='text-end'>Subtotal</p>
						</div>
						{
							cart?.products?.length > 0 && cart?.products?.map(product => <div key={product.product.id} className='flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium'>
								<p className='text-start'>{product.product.name}</p>
								<p className='text-end'>৳ {(product?.product?.price + product?.product?.tax + product?.product?.fee) * product.productQuantity} </p>
							</div>
							)
						}
						{
							cart?.requests?.length > 0 && cart?.requests?.map(request => {
								totalPrice += (request?.request?.price + request?.request?.tax + request?.request?.fee) * request.requestQuantity
								return <div key={request.request.id} className='flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium'>
									<p className='text-start'>{request.request.name}</p>
									<p className='text-end'>৳ {(request?.request?.price + request?.request?.tax + request?.request?.fee) * request.requestQuantity} </p>
								</div>
							})
						}
						{
							discount?.code &&
							<div className='flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium'>
								<p className='text-start'>{discount.code}</p>
								<p className='text-end'>{discount.amount ? `৳ ${discount.amount} tk` : discount.percentage}</p>
							</div>

						}
						{/* Subtotal */}
						<div className='flex items-center justify-between border-b py-4 text-base text-slate-600 font-medium'>
							<p className='text-start'>Subtotal</p>
							<p className='text-end text-black'>৳ {price + totalPrice}tk </p>
						</div>
					</div>
					<h4 className='flex items-center justify-between pt-4 text-base text-slate-600 font-medium'>
						Shipping
					</h4>
					{/* Radio Buttons */}
					<div className=' border-b py-4 text-base text-slate-600 font-medium'>
						{/* Radio Buttons for inside dhaka */}
						<div className='flex gap-2'>
							<input
								type='radio'
								id='insideDhaka'
								checked={inside}
								value={true}
								onClick={() => { setInside(true) }}
								{...register('insideDhaka')}
							/>
							<label
								htmlFor='insideDhaka'
								className='flex justify-between items-center w-full '
							>
								<span>Inside Dhaka</span>
								<span>99tk</span>
							</label>
						</div>

						{/* Radio Buttons for outside dhaka */}
						<div className='flex gap-2'>
							<input
								type='radio'
								id='outsideDhaka'
								checked={!inside}
								value={false}
								onClick={() => { setInside(false) }}
								{...register('insideDhaka')}
							/>
							<label
								htmlFor='outsideDhaka'
								className='flex justify-between items-center w-full '
							>
								<span>Outside Dhaka</span>
								<span>150tk</span>
							</label>
						</div>
					</div>
					{/* Estimated Total */}
					<div className='flex items-center justify-between py-4 text-base text-black font-medium'>
						<p className='text-start'>Estimated total</p>
						<p className='text-end text-xl font-bold'>৳ {price + totalPrice}tk </p>
					</div>
					<Button
						buttonType='secondaryButton'
						name='Continue to payment'
						className='w-full py-3 mt-8 px-[10px] '
					>
						<input type='submit' />
					</Button>
				</div>
			</form>
			{orderModal && <Modal orderModal={true} showModal={orderModal} setShowModal={setOrderModal}>
				<OrderSuccessModal
					id={orderid.split('=')[1]}
					setShowModal={setOrderModal}
				/>
			</Modal>
			}
		</div>
	);
};

export default Checkout;
