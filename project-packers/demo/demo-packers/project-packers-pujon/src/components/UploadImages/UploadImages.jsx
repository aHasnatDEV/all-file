import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import ImageUpload from '../../assets/icons/Image-upload.svg';

const UploadImages = ({ register, className }) => {
	const [previewImages, setPreviewImages] = useState([]);
	const [allImages, setAllImages] = useState([]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setAllImages((prev) => [...prev, file]);
		setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
	};

	const handleImageDelete = (index) => {
		const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
		const updatedAllImages = allImages.filter((_, i) => i !== index);
		setPreviewImages(updatedPreviewImages);
		setAllImages(updatedAllImages);
	};

	useEffect(() => {
		register('images', { value: allImages }); // Register the allImages array
		return () => {
			previewImages.forEach((image) => URL.revokeObjectURL(image));
		};
	}, [allImages, previewImages, register]);

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		setAllImages((prev) => [...prev, file]);
		setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
	};

	return (
		<>
			{/* products images */}
			<div className='p-3 rounded-lg '>
				<div className='flex items-center gap-3'>
					<div className='flex max-w-[400px]  overflow-x-scroll'>
						{previewImages.map((image, index) => (
							<div
								key={index}
								className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3	`}
							>
								<img
									src={image}
									alt=''
									className='max-w-[123px] min-w-[123px] '
								/>
								<button
									className='p-1 bg-[#CFF6EF] rounded-50 absolute right-2 top-2'
									onClick={(e) => {
										e.preventDefault();
										handleImageDelete(index);
									}}
								>
									<MdOutlineClose />{' '}
								</button>
							</div>
						))}
					</div>
					<div>
						<label
							htmlFor='file'
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							className={`cursor-pointer w-[134px] h-[133px] border rounded-lg flex flex-col items-center justify-center`}
						>
							<img src={ImageUpload} alt='' />
							<span>Upload Image</span>
						</label>
						<input
							type='file'
							id='file'
							onChange={handleFileChange}
							className='hidden'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UploadImages;
