import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

/**
 * Modal
 * @description this component used for modal opening and closing
 * @param {component} modalBody - recive a full customize component for modal body
 * @param {string} openButtonName - recive name of open modal button
 */

const Modal = ({
	children,
	showModal,
	setShowModal,
	requestModal,
	orderModal
}) => {
	const navigate = useNavigate();
	/**
	 * @description this funtion used for close a modal
	 */
	const closeModal = (e) => {
		e.preventDefault();
		requestModal && navigate('/home', { replace: true });
		setShowModal(false);
	};

	return (
		<>
			{/* For big screen */}
			{/* modal body */}
			<div
				className={`hidden md:block w-screen text-black h-screen fixed top-0 left-0 right-0 bottom-0 z-[999] overflow-hidden ${showModal ? 'scale-100 bg-[#0D3D4B]/70' : 'scale-0 bg-[#0D3D4B]/0'
					} transition-all  duration-500 `}
			>
				<div className={`fixed inset-0 flex items-center justify-center z-50 `}>
					<div className='bg-white p-6 rounded-lg shadow-lg relative'>
						{children}

						{/* Modal Close Button */}
						{orderModal ?
							<></> : <button
								className='text-3xl absolute top-5 right-4 text-gray-400 font-thin rounded'
								onClick={closeModal}
							>
								<AiOutlineClose />
							</button>
						}
					</div>
				</div>
			</div>

			{/* for small screen */}
			<div
				className={` md:hidden w-screen text-black h-screen fixed top-0 left-0 right-0 bottom-0 z-20  ${showModal
					? 'translate-y-0  bg-[#0D3D4B]/70'
					: 'translate-y-[100rem] bg-[#0D3D4B]/0'
					} transition-all  duration-500 `}
			>
				<div
					className={`fixed inset-x-0 bottom-0 flex items-center justify-center z-50 `}
				>
					<div className='bg-white w-full p-6 rounded-[12px_12px_0px_0px] shadow-lg relative'>
						{children}

						{/* Modal Close Button */}
						{orderModal ?
							<></> : <button
								className='text-3xl absolute top-5 right-4 text-gray-400 font-thin rounded'
								onClick={closeModal}
							>
								<AiOutlineClose />
							</button>
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
