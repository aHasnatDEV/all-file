import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { plane } from '../../contexts/terminal/Terminal';
import { Link } from 'react-router-dom';

const Blogs = () => {
	const [allBlogs, setAllBlogs] = useState([]);

	useEffect(() => {
		plane.request({ name: 'allBlog', queries: { page: 1 } }).then(data => data.docs && setAllBlogs(data.docs));
	}, []);
	return (
		<div className='pt-24  min-h-screen mb-12'>
			<div className='wrapper'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
					{allBlogs.length > 0 && allBlogs.map((blog) => (
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
	);
};

export default Blogs;
