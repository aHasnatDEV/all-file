import React from 'react';
import Button from '../../../../components/Button/Button';
import OrderStatusDropDown from '../OrderStatusDropDown/OrderStatusDropDown';

const OrderPaymentUpdate = ({ register }) => {
	return (
		<div>
			<div className=' border rounded-lg '>
				<div className='p-5 flex flex-col gap-4'>
					<h2 className='pb-5 text-base font-semibold'>Payment</h2>

					{/* subtotal */}
					<div className='flex items-center justify-between w-full'>
						<p className='text-sm font-normal text-black'>Subtotal</p>
						<p>1000S</p>
					</div>

					{/* add discount  */}
					<div className='flex items-center justify-between w-full'>
						{/* TODO: make this a link tag */}
						<p className='text-sm font-normal text-[#3E949A] underline'>
							Add discount
						</p>
						<p>-</p>
						<p>100</p>
					</div>

					{/* add shipping*/}
					<div className='flex items-center justify-between w-full'>
						<p className='text-sm font-normal text-[#3E949A] underline '>
							Add shipping
						</p>
						<p>-</p>
						<p>100</p>
					</div>

					{/* Estimated tax */}
					<div className='flex items-center justify-between w-full'>
						<p className='text-sm font-normal text-[#3E949A] underline '>
							Add shipping
						</p>
						<p>Vat 15%</p>
						<p>100</p>
					</div>

					{/* total */}
					<div className='flex items-center justify-between w-full'>
						<h3 className='text-sm font-semibold'>Total</h3>
						<p>Total</p>
					</div>
				</div>
				<hr />
				<div className='flex justify-end gap-4 w-full p-5'>
					<OrderStatusDropDown register={register} />
				</div>
			</div>
		</div>
	);
};

export default OrderPaymentUpdate;
