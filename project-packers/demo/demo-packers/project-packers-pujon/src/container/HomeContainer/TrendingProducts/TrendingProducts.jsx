import React, { useEffect, useState } from 'react';
import Headings from '../../../components/Headings/Headings';
import ProductsCard from '../../../components/ProductsCard/ProductsCard';
import Button from '../../../components/Button/Button';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { plane } from '../../../contexts/terminal/Terminal';

const TrendingProducts = () => {
	const [tProducts, setTProducts] = useState();
	useEffect(() => {
		plane.request({ name: 'allProduct', queries: { limit: 8 } }).then(data => data.docs && setTProducts(data.docs))
	}, []);

	return (
		<div>
			<div className='wrapper'>
				<Headings
					title='Trending products on  Project Packers'
					subTitle='Get inspired by what people in your city are buying from abroad with the biggest savings'
				/>

				<div className='grid py-[1px] justify-items-center px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
					{tProducts &&
						tProducts.map((product, index) => {
							const { id, images, price, tax, fee, description } = product;
							return (
								<Link
									to={`/home/items/${product.id}`}
									key={id}
								>
									<ProductsCard
										img={images[0]}
										title={description}
										price={price + tax + fee}
									/>
								</Link>
							);
						})}
				</div>

				<div className='flex items-center justify-center my-5'>
					<Link to='/home/shop'>
						{' '}
						<Button
							buttonType='secondaryButton'
							name='View more items'
							className='py-[14px] px-[20px]'
							icon={<BsArrowRight />}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TrendingProducts;
