import React, { useState, useEffect } from 'react';

const requestData = [
	{ time: '2023-08-01', requests: 20, orders: 10 },
	{ time: '2023-08-02', requests: 15, orders: 12 },
	{ time: '2023-08-03', requests: 25, orders: 8 },
	// Add more data as needed
];

const Chart = () => {
	const [sortBy, setSortBy] = useState('both');
	const [sortType, setSortType] = useState('day');

	const handleSortBy = (type) => {
		setSortBy(type);
		updateChart(type, sortType);
	};

	const handleSortType = (type) => {
		setSortType(type);
		updateChart(sortBy, type);
	};

	const updateChart = (sortBy, sortType) => {
		// Filter and sort data based on selected options
		const sortedData = requestData.sort((a, b) => {
			const dateA = new Date(a.time);
			const dateB = new Date(b.time);

			if (sortType === 'day') {
				return dateA - dateB;
			} else if (sortType === 'month') {
				return dateA.getMonth() - dateB.getMonth();
			} else if (sortType === 'year') {
				return dateA.getFullYear() - dateB.getFullYear();
			}

			return 0;
		});

		const labels = sortedData.map((item) => item.time);
		const requestValues = sortedData.map((item) => item.requests);
		const orderValues = sortedData.map((item) => item.orders);

		// Destroy previous chart if exists
		const canvas = document.getElementById('myChart');
		if (canvas) {
			const context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		}

		// Create a new chart
		const ctx = document.getElementById('myChart').getContext('2d');
		ctx.beginPath();
		ctx.moveTo(50, 20);
		ctx.lineTo(50, 320);
		ctx.lineTo(750, 320);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(50, 320);
		ctx.lineTo(45, 310);
		ctx.lineTo(55, 310);
		ctx.lineTo(50, 320);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.stroke();

		ctx.font = '12px Arial';
		ctx.fillStyle = '#000';
		for (let i = 0; i < labels.length; i++) {
			const x = 50 + (i * 700) / (labels.length - 1);
			ctx.beginPath();
			ctx.moveTo(x, 320);
			ctx.lineTo(x, 325);
			ctx.stroke();
			ctx.fillText(labels[i], x - 30, 340);
		}

		const maxValue = Math.max(
			Math.max(...requestValues),
			Math.max(...orderValues),
		);
		const stepSize = 50;

		for (let i = 0; i <= maxValue; i += stepSize) {
			const y = 320 - (i * 300) / maxValue;
			ctx.beginPath();
			ctx.moveTo(50, y);
			ctx.lineTo(45, y);
			ctx.lineTo(55, y);
			ctx.fillStyle = '#000';
			ctx.fill();
			ctx.stroke();
			ctx.fillText(i.toString(), 10, y);
		}

		ctx.beginPath();
		ctx.moveTo(50, 320);
		ctx.lineTo(50, 20);
		ctx.lineTo(55, 30);
		ctx.lineTo(45, 30);
		ctx.lineTo(50, 20);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(50, 320);
		ctx.lineTo(750, 320);
		ctx.lineTo(745, 325);
		ctx.lineTo(745, 315);
		ctx.lineTo(750, 320);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.stroke();

		if (sortBy === 'both' || sortBy === 'requests') {
			// Draw gradient for request chart
			const gradient = ctx.createLinearGradient(0, 0, 0, 320);
			gradient.addColorStop(0, 'rgba(75, 192, 192, 0.7)');
			gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
			ctx.strokeStyle = gradient;

			ctx.beginPath();
			for (let i = 0; i < requestValues.length; i++) {
				const x = 50 + (i * 700) / (requestValues.length - 1);
				const y = 320 - (requestValues[i] * 300) / maxValue;
				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}
			ctx.stroke();
		}

		if (sortBy === 'both' || sortBy === 'orders') {
			// Draw gradient for order chart
			const gradient = ctx.createLinearGradient(0, 0, 0, 320);
			gradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)');
			gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');
			ctx.strokeStyle = gradient;

			ctx.beginPath();
			for (let i = 0; i < orderValues.length; i++) {
				const x = 50 + (i * 700) / (orderValues.length - 1);
				const y = 320 - (orderValues[i] * 300) / maxValue;
				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}
			ctx.stroke();
		}
	};

	// Initial chart creation
	useEffect(() => {
		updateChart(sortBy, sortType);
	}, []);

	return (
		<div className='container mx-auto mt-4 p-4'>
			<div className='flex justify-end space-x-4 mb-4'>
				<button
					className={`px-4 py-2 rounded ${
						sortBy === 'both' || sortBy === 'requests'
							? 'bg-blue-500 text-white'
							: 'bg-gray-300 text-gray-600'
					}`}
					onClick={() => handleSortBy(sortBy === 'both' ? 'requests' : 'both')}
				>
					Requests
				</button>
				<button
					className={`px-4 py-2 rounded ${
						sortBy === 'both' || sortBy === 'orders'
							? 'bg-blue-500 text-white'
							: 'bg-gray-300 text-gray-600'
					}`}
					onClick={() => handleSortBy(sortBy === 'both' ? 'orders' : 'both')}
				>
					Orders
				</button>
				<div className='relative inline-block'>
					<button
						className='px-4 py-2 rounded bg-gray-300 text-gray-600'
						onClick={() => handleSortType('day')}
					>
						Day
					</button>
					{sortType === 'day' && (
						<div className='absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg'>
							<button
								className='block px-4 py-2 w-full text-left hover:bg-blue-500 hover:text-white'
								onClick={() => handleSortType('month')}
							>
								Month
							</button>
							<button
								className='block px-4 py-2 w-full text-left hover:bg-blue-500 hover:text-white'
								onClick={() => handleSortType('year')}
							>
								Year
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='w-full h-80'>
				<canvas id='myChart' width='800' height='400'></canvas>
			</div>
		</div>
	);
};

export default Chart;
