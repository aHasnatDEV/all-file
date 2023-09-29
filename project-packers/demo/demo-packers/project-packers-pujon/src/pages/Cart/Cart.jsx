import React, { useCallback, useEffect, useState } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import './Cart.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { plane } from '../../contexts/terminal/Terminal';
import toaster from '../../utils/toaster';
import cross from '../../assets/icons/cd-cancel.svg'

/**
 * @param {boolean} isNavbar - recieve why this component used for. if true then it used for navigation else for page
 * @returns
 */
const Cart = ({ isNavbar, isCartOpen }) => {
	let sellerTakes = 0;
	let tax = 0;
	let fee = 0;
	let totalPrice = 0;
	const [price, setPrice] = useState()
	const [cart, setCart] = useState()
	const [discount, setDiscount] = useState()

	useEffect(() => {
		plane.request({ name: 'getCart' }).then(data => {
			if (data.id) {
				setCart(data);
				if (data.discountApplied) setDiscount(data.discountApplied);
			}
		})
	}, [isCartOpen]);

	const updateQuantity = useCallback((id, quantity) => {
		setCart(prevCart => {
			const updatedCart = {
				...prevCart,
				products: prevCart.products.map(item =>
					item.product.id === id ? { ...item, productQuantity: quantity } : item
				),
				requests: prevCart.requests.map(item =>
					item.request.id === id ? { ...item, requestQuantity: quantity } : item
				)
			};
			return updatedCart;
		});
	}, []);

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
			setPrice(totalPrice);
		}
	}, [cart, discount]);

	const addDiscount = async (e) => {
		e.preventDefault();
		if (cart.discountApplied) {
			toaster({ type: 'error', message: 'Discount already applied' });
			return;
		}

		const response = await plane.request({ name: 'useDiscount', queries: { code: e.target.code.value.toUpperCase() } });

		if (response.code) {
			setDiscount(response);
			toaster({ type: 'success', message: 'Discount Applied' });
			const updatedCart = await plane.request({ name: 'updateCart', body: { discountApplied: response } });
			if (updatedCart.id) {
				setCart(updatedCart);
			}
		} else {
			toaster({ type: 'error', message: response.message || 'An error occurred. Please try again later' });
		}
	};

	const removeDiscount = async () => {
		const data = await plane.request({ name: 'updateCart', body: { discountApplied: {} } });
		if (data.id) setCart(data)
		await plane.request({ name: 'abandonDiscount', queries: { code: discount.code } }).then(data => {
			if (data.status) {
				toaster({ type: 'success', message: data.message })
				setDiscount()
			}
		}
		)
	}

	const updateCart = async () => {
		const products = cart.products.map(product => ({
			product: product.product.id,
			productQuantity: product.productQuantity
		}));

		const requests = cart.requests.map(request => ({
			request: request.request.id,
			requestQuantity: request.requestQuantity
		}));
		const data = await plane.request({ name: 'updateCart', body: { ...(products.length && { products }), ...(requests.length && { requests }) } })
		if (data.id) setCart(data)
	};

	return (
		<div
			className={`wrapper flex flex-col xl:flex-row gap-[30px] ${isNavbar || 'mt-[96px] min-h-screen mb-20'}`}
		>
			{
				cart?.length < 1 ? <p>nothing added in cart</p> : <>
					<div className={isNavbar ? 'w-full' : 'w-full xl:w-[70%]'}>
						{/* table */}
						<table className={`w-full`}>
							{/* for page */}
							{!isNavbar && (
								// table head
								<thead className='hidden md:table-header-group border-b  '>
									<tr className='text-sm font-semibold text-[#124E58] '>
										<th className='text-start'>Product List</th>
										<th className='text-start'>Quantity</th>
										<th className='text-start'>Price</th>
									</tr>
								</thead>
							)}

							{/* table body */}
							<tbody>
								{cart?.products?.length > 0 && cart?.products?.map((product) => {
									sellerTakes += product?.product?.price * product.productQuantity
									tax += product?.product?.tax * product.productQuantity
									fee += product?.product?.fee * product.productQuantity
									return <CartCard
										key={product?.product?.id}
										id={product?.product?.id}
										isNavbar={isNavbar}
										updateQuantity={updateQuantity}
										ProductQuantity={product?.productQuantity}
										productImg={product?.product?.images[0]}
										price={(product?.product?.price + product?.product?.tax + product?.product?.fee) * product.productQuantity}
										productName={product?.product?.name}
									/>
								})}
								{cart?.requests?.length > 0 && cart?.requests?.map((request) => {
									sellerTakes += request?.request?.price * request.requestQuantity
									tax += request?.request?.tax * request.requestQuantity
									fee += request?.request?.fee * request.requestQuantity
									totalPrice += (request?.request?.price + request?.request?.tax + request?.request?.fee) * request.requestQuantity
									return <CartCard
										key={request?.request?.id}
										isNavbar={isNavbar}
										ProductQuantity={request?.requestQuantity}
										productImg={request?.request?.images[0]}
										price={(request?.request?.price + request?.request?.tax + request?.request?.fee) * request.requestQuantity}
										productName={request?.request?.name}
									/>
								})}
							</tbody>
						</table>
						{isNavbar || (
							<div className='flex items-center justify-between mt-[26px] w-full lg:w-[70%]'>
								{!discount?.code ? <form onSubmit={addDiscount} >
									<div>
										<input
											type='text'
											name='code'
											className='w-[250px] rounded-50 outline-none border border-[#000316]/5 ps-5 py-[14px]'
											placeholder='Discount code'
											required
										/>
										<button type='submit' className='bg-[#CFF6EF] py-3 px-8 rounded-50'>
											Apply
										</button>
									</div>
								</form>
									:
									<div className='bg-slate-50 py-3 px-8 rounded-50 flex justify-between gap-3'>
										<p>{discount.code}</p>
										<button onClick={removeDiscount}>
											<img src={cross} className='w-5 h-5' alt="" />
										</button>
									</div>}
								<button onClick={updateCart} className='bg-slate-50 py-3 px-8 rounded-50'>
									Update Cart
								</button>
							</div>
						)}
					</div>

					{isNavbar || (
						<div className='xl:flex-1 p-[30px] border rounded-[8px] xl:h-[372px]'>
							<div className=''>
								{/* title */}
								<div className='border-b py-4 text-lg font-medium '>
									Price Details
								</div>
								<div className='border-b'>
									<div className='flex justify-between items-center py-4'>
										<span className='text-start'>Seller Takes</span>
										<span className='text-end'>৳ {sellerTakes} k</span>
									</div>
									<div className='flex justify-between items-center py-4'>
										<span className='text-start'>Seller Takes</span>
										<span className='text-end'>৳ {tax} k</span>
									</div>{' '}
									<div className='flex justify-between items-center py-4'>
										<span className='text-start'>Packers Fee</span>
										<span className='text-end'>৳ {fee} k</span>
									</div>
								</div>
							</div>
							<div className='flex justify-between items-center py-4'>
								<span className='text-start'>Total Price</span>
								<span className='text-end'>৳ {price + totalPrice} k</span>
							</div>
							<Link to='/home/checkout'>
								<Button
									buttonType='secondaryButton'
									name='Checkout'
									className='py-12px px-10px w-full'
								></Button>
							</Link>
						</div>
					)}</>
			}

		</div>
	);
};

export default Cart;
