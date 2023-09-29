import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import PreviousButtonHeading from "../../../components/PreviousButtonHeading/PreviousButtonHeading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Delete from "../../../assets/icons/Delete.svg";
import axios from "axios";
import { useForm } from "react-hook-form";
import CustomerDetailsUpdate from "../../../container/AdminContainer/CustomerDetailsUpdate/CustomerDetailsUpdate";
import OrderPaymentUpdate from "../../../container/AdminContainer/OrderDetailsContainer/OrderPaymentUpdate/OrderPaymentUpdate";
import OrderProductsUpdate from "../../../container/AdminContainer/OrderDetailsContainer/OrderProductsUpdate/OrderProductsUpdate";
import { useEffect } from "react";
import removeEmptyFields from "../../../utils/removeEmptyFields";
import { plane } from "../../../contexts/terminal/Terminal";

const OrderDetails = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(null);
  const [singleOrder, setSingleOrder] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    plane.request({ name: "singleOrder", params: { id: id } }).then((res) => {
      setSingleOrder(res);
    });
  }, []);

//  console.log(singleOrder);

  useEffect(() => {});

  const onSubmit = async (data) => {
    removeEmptyFields(data);
    console.log(data);
  };

  return (
    <div>
      <div className="p-[20px_0]  border-b w-full flex justify-between items-center">
        <PreviousButtonHeading id={id} buttonName="Back to order" />
        <div className="flex gap-4">
          <button
            form="orderUpdate"
            type="submit"
            className="flex items-center gap-2"
          >
            <img src={Delete} alt="" /> Delete
          </button>
          <Button
            buttonType="secondaryButton"
            name="Update"
            className="rounded-[5px]"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="orderUpdate"
        className="flex gap-4 items-start mt-5"
      >
        {/* Item details */}
        <div className="w-4/6 flex flex-col gap-4">
          <OrderProductsUpdate
            products={singleOrder?.products}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            register={register}
          />
          <OrderPaymentUpdate register={register} />
        </div>

        <div className="w-1/3">
          <CustomerDetailsUpdate
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            register={register}
          />
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// const OrderDetails = () => {
// 	const [selectedImage, setSelectedImage] = useState(null);

// 	const handleFileChange = (e) => {
// 		setSelectedImage(e.target.files[0]);
// 	};

// 	const handleUpload = async () => {
// 		if (selectedImage) {
// 			const formData = new FormData();

// 			formData.append('images', selectedImage);

// 			// 	fetch('http://localhost:4000/api/request/64d32151ff0abe43d9cbb5ab', {
// 			// 		method: 'PATCH',
// 			// 		credentials: 'include',
// 			// 		headers: {
// 			// 			Accept: 'application/json',
// 			// 			'Content-Type': 'application/json',
// 			// 			'Access-Control-Allow-Credentials': true,
// 			// 		},
// 			// 		body: JSON.stringify({
// 			// 			name: 'pujon',
// 			// 		}),
// 			// 	})
// 			// 		.then((res) => res.json())
// 			// 		.then((data) => console.log(data));
// 			// }

// 			formData.forEach((e) => console.log(e));

// 			try {
// 				const response = await axios.patch(
// 					'http://localhost:4000/api/request/64d32151ff0abe43d9cbb5ab',
// 					{
// 						name: 'pujonnnnnnn',
// 						formData,
// 					},

// 					{
// 						withCredentials: true,
// 						headers: {
// 							Accept: 'application/json',
// 							'Content-Type': 'multipart/form-data',
// 							'Access-Control-Allow-Credentials': true,
// 						},
// 					},
// 				);

// 				console.log('Image uploaded:', response.data);
// 			} catch (error) {
// 				console.error('Error uploading image:', error);
// 			}
// 		}
// 	};

// 	const {
// 		register,
// 		handleSubmit,
// 		watch,
// 		reset,
// 		formState: { errors },
// 	} = useForm();

// 	const onSubmit = (data) => {
// 		console.log('click');
// 		console.log(data);
// 		reset();
// 	};

// 	return (
// 		<div>
// 			<input type='file' onChange={handleFileChange} />
// 			<button onClick={handleUpload}>Upload Image</button>

// 			<button type='submit' form='try-form' className='p-2 border bg-green-400'>
// 				form submit try
// 			</button>

// 			<form id='try-form' action='' onSubmit={handleSubmit(onSubmit)}>
// 				<label htmlFor='text'></label>
// 				<input type='text' name='text' id='text' {...register('text')} />
// 			</form>
// 		</div>
// 	);
// };

// export default OrderDetails;
