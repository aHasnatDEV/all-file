import React, { useEffect, useState } from 'react';
import order from '../../assets/icons/ordersuccess.png'
import Button from '../../components/Button/Button';
import { plane } from '../../contexts/terminal/Terminal';
import { Link } from 'react-router-dom';

const OrderSuccessModal = ({ setShowModal, id }) => {
    const [orderdata, setOrderdata] = useState()
    useEffect(() => {
        plane.request({ name: 'singleOrder', params: { id: id } }).then(data => data.id && setOrderdata(data))
    }, [id])
    const orderDate = new Date(orderdata?.date);
    const oneWeekLater = new Date(orderDate);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const twoWeeksLater = new Date(oneWeekLater);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 7);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return (
        <div className='px-4 py-6'>
            <img src={order} alt="" />
            <h1 className='text-primary text-xl font-semibold mt-5'>Thank you for your order.</h1>
            <p>We sent an order confirmation to:</p>
            <p className='text-primary font-semibold'>{orderdata?.user?.email}</p>
            <p>Your order number is:</p>
            <p className='text-primary font-semibold'># {orderdata?.user?.id}</p>
            <p> Your order will deliver on:</p>
            <p className='text-primary font-semibold'> {oneWeekLater.toLocaleString('en-US', options)} - {twoWeeksLater.toLocaleString('en-US', options)}</p>
            <p> to the address:</p>
            <p className='text-primary font-semibold'>{
                orderdata?.shippingaddress?.address + ', ' +
                orderdata?.shippingaddress?.city + ', ' +
                orderdata?.shippingaddress?.area
            }</p>
            <Link to={'/home'}>
                <Button
                    onClick={() => { setShowModal(false) }}
                    buttonType='secondaryButton'
                    name='Continue Shopping'
                    className='w-full py-3 mt-8 px-[10px] '
                />
            </Link>

        </div>
    );
};

export default OrderSuccessModal;