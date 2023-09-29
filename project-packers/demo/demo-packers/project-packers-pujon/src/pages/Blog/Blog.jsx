import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard/BlogCard';
import { plane } from '../../contexts/terminal/Terminal';
import myAcct from '../../assets/Avatar.png';

const Blog = () => {
	const [blogDetails, setBlogDetails] = useState({});
	const [blogs, setBlogs] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		plane.request({ name: 'singleBlog', params: { id: id } }).then(data => data.id && setBlogDetails(data));
	}, [id]);

	useEffect(() => {
		plane.request({ name: 'allBlog', queries: { page: 1 } }).then(data => data.docs && setBlogs(data.docs));
	}, []);
	return (
		<>
			{/* header */}
			<div
				style={{ backgroundImage: `url(${`${import.meta.env.VITE_SERVER_URL}/${blogDetails?.banner}`})` }}
				className={`backgroundImage w-[375px] h-[276px] md:w-screen md:h-[600px] flex items-center justify-center`}
			>
				<div className='wrapper  '>
					<p className=' text-[32px] md:text-[40px] font-semibold text-white'>
						{blogDetails?.title}
					</p>
					<div className='flex items-center gap-4 text-white text-base'>
						<img
							src={!blogDetails?.user?.avatar ? myAcct : `${import.meta.env.VITE_SERVER_URL}/${blogDetails?.user?.avatar}`}
							alt=''
							className=' w-[32px] md:w-[42px] h-[32px] md:h-[42px] rounded-50'
						/>
						<p className=' font-medium'>{blogDetails?.user?.fullName}</p>
						<div className='w-[4px] h-[4px] rounded-full text-white border-[4px]'></div>
						<p>{new Date(blogDetails?.date).toLocaleString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}</p>
					</div>
				</div>
			</div>
			<div className='wrapper'>
				{/* blog details */}
				<div className='w-[804px] mx-auto pt-12 pb-[148px]'>
					{/* title */}
					<div className='text-[32px] font-semibold'>{blogDetails?.title}</div>
					{/* description */}
					<div className='text-base font-normal' dangerouslySetInnerHTML={{ __html: blogDetails?.content }} />
					{/* <p className='text-base font-normal'>{blogDetails?.description}</p> */}
				</div>

				{/* more blogs section */}
				<div className='pb-[148px]'>
					<div className='flex items-center justify-between w-full pb-12'>
						<div className='text-[32px] font-semibold text-[#0D3D4B]'>
							You may also like
						</div>
						<div className='flex items-center gap-2'>
							<button className='p-2 rounded-50 bg-[#CFF6EF] text-[#0D3D4B]'>
								{'<='}
							</button>
							<Link to='/home/blogs'>
								<button className='p-2 rounded-50 bg-[#F2C852] text-[#0D3D4B]'>
									{'=>'}
								</button>
							</Link>
						</div>
					</div>

					{/* more blog card */}
					<div className='flex items-center overflow-x-scroll gap-7'>
						{blogs.length > 0 && blogs.filter(blog => { return blog.id !== id }).map((blog) => (
							<Link key={blog.id} to={`/home/blog/${blog.id}`}>
								<div key={blog.id}>
									<BlogCard
										img={blog.banner}
										id={blog.id}
										title={blog.title}
										details={blog.description}
									/>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Blog;
