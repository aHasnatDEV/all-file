import React from 'react';
import { Link } from 'react-router-dom';
// TODO: Remove image from here when Image coming from db
import blog1 from '../../assets/Blog1.png';

/**
 *
 * @param {string} img -recive img src
 * @param {string} title - recive blog title
 * @param {string} details - recive blog details
 * @returns
 */
const BlogCard = ({ id, img, title, details }) => {
	return (
		<div
			className='rounded-2xl border'
			style={{
				boxShadow:
					'0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.05)',
			}}
		>
			<div className='h-[250px]'>
				<img src={`${import.meta.env.VITE_SERVER_URL}/${img}`} alt='' className='bg-black rounded-t-xl w-full h-full' />
			</div>
			<div className='p-5 flex flex-col items-start gap-4'>
				<p className='text-base font-semibold'>{title}</p>
				<p className='text-sm font-normal '>{details}</p>
				<Link to={`/home/blog/${id}`}>
					{' '}
					<button className='text-primary text-sm font-semibold border p-2 rounded'>
						Learn more
					</button>{' '}
				</Link>
			</div>
		</div>
	);
};

export default BlogCard;
