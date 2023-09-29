import React, { useState } from 'react';
import { plane } from '../../../contexts/terminal/Terminal';

const Support = () => {
	const [selectedImages, setSelectedImages] = useState([]);

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		// selectedImages.forEach((file) => {
		// 	formData.append('images', file);
		// });
		// formData.append('data', JSON.stringify({ name: 'Yeasir' }))
		// // for (const pair of formData.entries()) {
		// // 	console.log('support', pair);
		// }
		plane.request({ name: 'imagetest', body: { data: { name: 'Yeasir' }, images: selectedImages } })
		// try {
		// 	const response = await fetch('http://localhost:4000/api/imagetest', {
		// 		method: 'POST',
		// 		credentials: 'include',
		// 		body: formData,
		// 	});

		// 	const responseData = await response.json();

		// 	console.log('API Response:', responseData);
		// } catch (error) {
		// 	console.error('Error uploading image:', error);
		// }
		// try {
		// 	const response = await axios.post(
		// 		'http://localhost:4000/api/imagetest',
		// 		formData,
		// 		{
		// 			withCredentials: true,
		// 			headers: {
		// 				Accept: 'application/json',
		// 				'Content-Type': 'multipart/form-data',
		// 				'Access-Control-Allow-Credentials': true,
		// 			},
		// 		}
		// 	);

		// 	console.log('API Response:', response.data);
		// } catch (error) {
		// 	console.error('Error uploading image:', error);
		// }
	};
	// console.log(selectedImages);

	const handleImageChange = (e) => {
		setSelectedImages([...selectedImages, ...e.target.files]);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type='file' name='images' id='' onChange={handleImageChange} />
				<input type='file' name='images2' id='' onChange={handleImageChange} />
				<input type='submit' />
			</form>
		</div>
	);
};

export default Support;
