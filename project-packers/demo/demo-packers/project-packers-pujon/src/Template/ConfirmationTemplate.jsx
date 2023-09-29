import React, { useState } from 'react';
import logo1 from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import confirmLogo from '../assets/icons/templateConfirm.svg';

import './Template.css';

const ConfirmationTemplate = () => {
	const order = {
		shippingaddress: {
			address: 'hello',
			city: 'hello',
			area: 'hello',
			zip: 'hello',
		},
		id: '64cb74230fd31c7dcea9bff5',
		user: {
			id: '64b4cbc2bb769ae707dbfb4f',
			fullName: 'Yeasir Hossain',
			email: 'yeasir@mail.com',
			password: '$2b$08$bZrwvyGfI2TdUq03pH6X7uWE3I3OuujveKhstRasYjR9oLQyEuL8i',
			role: 'admin',
			createdAt: '2023-07-17T05:04:02.508Z',
			updatedAt: '2023-07-17T12:04:16.671Z',
			__v: 0,
		},
		email: 'yeasir@mail.com',
		products: [
			{
				product: {
					id: '64ca84cf1c1475adfdf18e4d',
					name: 'Testing3',
					description: 'This is a sample product description.',
					origin: 'Sample Origin',
					images: ['images/367f9b7649a6d14ea344a101c6ff5cd4.jpg'],
					quantity: 15,
					price: 10,
					tax: 10,
					fee: 5,
					category: '64c37d290d10a967880c78f8',
					subcategory: '64c37e7cf430b430756d9b6e',
					tags: 'sample, shoe, electronics',
					link: 'https://example.com/sample-product',
					status: 'active',
					__v: 0,
				},
				productQuantity: 1,
				id: '64cb74230fd31c7dcea9bff6',
			},
			{
				product: {
					id: '64ca8f5a02478c400e1f78a9',
					name: 'Testing2',
					description: 'This is a sample product description.',
					origin: 'Sample Origin',
					images: ['images/367f9b7649a6d14ea344a101c6ff5cd4.jpg'],
					quantity: 15,
					price: 10,
					tax: 10,
					fee: 5,
					category: '64c37d290d10a967880c78f8',
					subcategory: '64c37d280d10a967880c78f6',
					tags: 'sample, shoe, electronics',
					link: 'https://example.com/sample-product',
					status: 'active',
					__v: 0,
				},
				productQuantity: 1,
				id: '64cb74230fd31c7dcea9bff7',
			},
		],
		date: '2023-08-03T09:32:09.521Z',
		insideDhaka: true,
		status: 'paid',
		phone: '011111111',
		requests: [],
		sessionkey: 'DF913080971614E2C069CE1203E39BAD',
		total: 149,
		bankTranid: '2308031535590gNOGVjMfgWb1eY',
		storeAmount: 145.28,
		trxID: 'PPLKUYKGTJ',
		valid: '2308031535590ciy3h9ckObxWC5',
	};

	const { id, date, products } = order;

	const shippingAddress =
		order.shippingaddress.area +
		', ' +
		order.shippingaddress.city +
		', ' +
		order.shippingaddress.address +
		', ' +
		order.shippingaddress.zip;

	console.log(shippingAddress);

	let totalTax = 0;
	let totalFee = 0;
	let totalPrice = 0;
	let totalEstimatedPrice = 0;
	products.map((product) => {
		(totalTax += product.product.tax),
			(totalFee += product.product.fee),
			(totalPrice += product.product.price * product.productQuantity);

		totalEstimatedPrice +=
			product.product.price + product.product.fee + product.product.tax;
	});

	console.log(totalFee, totalEstimatedPrice, totalTax);

	return (
		<div className='container'>
			<div className='card'>
				<div className='flex justify-between items-center'>
					<img src={logo1} alt='' />
					<p>{order.date}</p>
				</div>

				<div className='flex items-center justify-center flex-col text-center mt-45 mb-8'>
					<img src={confirmLogo} alt='' className='mb-6' />
					<p className='text-32 font-bold text-primary'>
						Your order is on its way
					</p>
					<p className='text-slate-600 text-base font-normal mt-2'>
						Please allow 24 hours to track your order
					</p>

					<button className='bg-yellow text-primary p-12-14 mt-4 mb-8 rounded-50 font-semibold'>
						Track your order
					</button>
				</div>

				<div className='grid grid-cols-2 font-semibold text-slate-600 text-sm'>
					<div className='border p-3 space-y-2'>
						<p className='text-lg text-primary mb-5'>Summary:</p>
						<p>
							<span>Order:</span> <span className='ms-2'>#{id}</span>
						</p>
						<p>
							<span>Order Date:</span>
							<span className='ms-2'>{date}</span>
						</p>
						<p>
							<span>Order Total:</span>
							<span className='ms-2'>${totalEstimatedPrice} </span>
						</p>
					</div>
					<div className='border p-3 space-y-2'>
						<p className='text-lg text-primary mb-5 font-semibold'>
							Shipping Address
						</p>
						<p>{shippingAddress}</p>
					</div>
				</div>

				<div>
					<table className='table'>
						<thead className='thead'>
							<tr>
								<th className='th'>Product List</th>
								<th className='th'>Qty</th>
								<th className='th'>Price</th>
							</tr>
						</thead>
						<tbody className='tbody'>
							{products.map((product) => (
								<tr className='tr' key={product.product.id}>
									<td className='td'>
										<div className='flex items-center gap-1'>
											<img
												src={`http://localhost:4000/api/${product.product.images[0]}`}
												alt=''
												className='w-16 h-16'
											/>
											<p
												className='text-base font-normal  block'
												style={{ color: 'black' }}
											>
												{product.product.name}
											</p>
										</div>
									</td>
									<td className='td' style={{ color: 'black' }}>
										<div className='flex items-center gap-5'>
											{product.productQuantity}
										</div>
									</td>
									<td className='td'>
										<div className='flex items-center gap-5'>
											<span>{product.product.price}</span>
										</div>
									</td>
								</tr>
							))}
							{/* <tr className='tr'>
								<td className='td'>
									<div className='flex items-center gap-1'>
										<img src={productImg} alt='' />
										<p
											className='text-base font-normal block'
											style={{ color: 'black' }}
										>
											OTTERBOX COMMUTER SERIES Case for iPhone 12 & iPhone 12
											Pro
										</p>
									</div>
								</td>
								<td className='td' style={{ color: 'black' }}>
									<div className='flex items-center gap-5'>1</div>
								</td>
								<td className='td'>
									<div className='flex items-center gap-5'>
										<span>৳22,590.00tk</span>
									</div>
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>

				<div className='width-347 ms-auto'>
					<div className='border-b text-base text-slate-600'>
						<div className='flex justify-between items-center py-4'>
							<span className='text-start'>Seller Takes</span>
							<span className='text-end'>৳ {totalPrice} k</span>
						</div>
						<div className='flex justify-between items-center py-4'>
							<span className='text-start'>US sales tax</span>
							<span className='text-end'>৳ {totalTax} k</span>
						</div>
						<div className='flex justify-between items-center py-4'>
							<span className='text-start'>Packers Fee</span>
							<span className='text-end'>৳ {totalFee} k</span>
						</div>
					</div>

					<div className='flex justify-between items-center py-4'>
						<span className='text-start'>Estimated total</span>
						<span className='text-end text-lg font-bold'>
							৳ {totalEstimatedPrice} tk
						</span>
					</div>
				</div>
				<button className='bg-yellow text-primary p-12-14 rounded-50 w-full text-sm font-bold'>
					Keep Shopping with us
				</button>
			</div>
			<div className='flex items-center justify-center py-5'>
				<img src={logo2} alt='' />
			</div>
		</div>
	);
};

export default ConfirmationTemplate;

// {
// 	<div className='w-[600px] bg-[#124E58] mx-auto px-4 pt-4 my-5'>

// 	   <div className='bg-white p-5 rounded'>

// 		   {/* top logo and date */}

// 		   <div className='flex justify-between items-center'>

// 			   <img src={logo1} alt='' />

// 			   <p>March 24, 2023</p>

// 		   </div>

// 		   {/* header */}

// 		   <div className='flex items-center justify-center flex-col text-center mt-[45px] mb-8'>

// 			   <img src={confirmLogo} alt='' className='mb-6' />

// 			   <p className='text-[32px] font-bold text-[#0D3D4B]'>

// 				   Your order is on its way

// 			   </p>

// 			   <p className='text-slate-600 text-base font-normal mt-2'>

// 				   Please allow 24 hours to track your order

// 			   </p>

// 			   <button className='bg-[#F2C852] text-[#0D3D4B] p-[12px_14px] mt-4 mb-8 rounded-50 text[#0D3D4B] font-semibold '>

// 				   Track your order

// 			   </button>

// 		   </div>

// 		   {/* summary and shipping address */}

// 		   <div className='grid grid-cols-2 font-semibold text-slate-600 text-sm'>

// 			   {/* summary */}

// 			   <div className='border p-3 space-y-2 '>

// 				   <p className='text-lg text-[#124E58] mb-5'>Summary:</p>

// 				   <p>

// 					   <span>Order:</span> <span className='ms-2'>#3214324</span>

// 				   </p>

// 				   <p>

// 					   <span>Order Date:</span>

// 					   <span className='ms-2'>March 24, 2023</span>

// 				   </p>

// 				   <p>

// 					   <span>Order Total:</span>

// 					   <span className='ms-2'>$254.00</span>

// 				   </p>

// 			   </div>

// 			   {/* Shipping address */}

// 			   <div className='border p-3 space-y-2'>

// 				   <p className='text-lg text-[#124E58] mb-5 font-semibold'>

// 					   Shipping Address

// 				   </p>

// 				   <p>4517 Washington Ave. Manchester, Kentucky 39495</p>{' '}

// 			   </div>

// 		   </div>

// 		   {/* Product list */}

// 		   <div>

// 			   <table>

// 				   <thead className='text-sm text-[#124E58] font-semibold border-b'>

// 					   <tr>

// 						   <th className='text-start'>Product List</th>

// 						   <th className='text-start'>Qty</th>

// 						   <th className='text-start'>Price</th>

// 					   </tr>

// 				   </thead>

// 				   <tbody>

// 					   <tr className='border-b'>

// 						   {/* 1st col */}

// 						   <td className='col  '>

// 							   <div className='flex items-center gap-1 '>

// 								   <img src={productImg} alt='' />

// 								   {/* for bigger device */}

// 								   <p className='text-base font-normal hidden md:block'>

// 									   OTTERBOX COMMUTER SERIES Case for iPhone 12 & iPhone 12

// 									   Pro

// 								   </p>

// 							   </div>

// 						   </td>

// 						   {/* 2nd col */}

// 						   <td className='col  '>

// 							   <div className='flex items-center gap-5'>1</div>

// 						   </td>

// 						   {/* 3rd col */}

// 						   <td className='col   '>

// 							   <div className='flex items-center gap-5'>

// 								   <span>৳22,590.00tk</span>

// 							   </div>

// 						   </td>

// 					   </tr>

// 					   <tr className='border-b'>

// 						   {/* 1st col */}

// 						   <td className='col  '>

// 							   <div className='flex items-center gap-1 '>

// 								   <img src={productImg} alt='' />

// 								   {/* for bigger device */}

// 								   <p className='text-base font-normal hidden md:block'>

// 									   OTTERBOX COMMUTER SERIES Case for iPhone 12 & iPhone 12

// 									   Pro

// 								   </p>

// 							   </div>

// 						   </td>

// 						   {/* 2nd col */}

// 						   <td className='col  '>

// 							   <div className='flex items-center gap-5'>1</div>

// 						   </td>

// 						   {/* 3rd col */}

// 						   <td className='col   '>

// 							   <div className='flex items-center gap-5'>

// 								   <span>৳22,590.00tk</span>

// 							   </div>

// 						   </td>

// 					   </tr>

// 				   </tbody>

// 			   </table>

// 		   </div>

// 		   {/* details */}

// 		   <div className='w-[347px] ms-auto'>

// 			   <div className='border-b text-base text-slate-600'>

// 				   <div className='flex justify-between items-center py-4'>

// 					   <span className='text-start'>Seller Takes</span>

// 					   <span className='text-end'>৳ 2323k</span>

// 				   </div>

// 				   <div className='flex justify-between items-center py-4'>

// 					   <span className='text-start'>Seller Takes</span>

// 					   <span className='text-end'>৳ 2312312k</span>

// 				   </div>{' '}

// 				   <div className='flex justify-between items-center py-4'>

// 					   <span className='text-start'>Packers Fee</span>

// 					   <span className='text-end'>৳ 123123 k</span>

// 				   </div>

// 			   </div>

// 			   <div className='flex justify-between items-center py-4'>

// 				   <span className='text-start'>Estimated total</span>

// 				   <span className='text-end text-xl font-bold'>৳ 22,590.00tk </span>

// 			   </div>

// 		   </div>

// 		   <button className='bg-[#F2C852] text-[#0D3D4B] p-[12px_14px] rounded-50 w-full text-sm font-bold'>

// 			   Keep Shopping with us

// 		   </button>

// 	   </div>

// 	   <div className='flex items-center justify-center py-5'>

// 		   <img src={logo2} alt='' />

// 	   </div>

// 	  </div>
// }
