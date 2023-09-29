import React from 'react';
import ShopCategory from '../../components/ShopCategory/ShopCategory';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import { plane } from '../../contexts/terminal/Terminal';
import { category } from '../../contexts/terminal/apiData/category';

const Shop = () => {
	const [ids, setIds] = useState({});
	const [products, setProducts] = useState();
	useEffect(() => {
		const requestObject = { name: 'allProduct', queries: { page: 1 } };
		if (ids.categoryID) {
			requestObject.queries.category = ids.categoryID;
		}
		if (ids.subcategoryID) {
			requestObject.queries.subcategory = ids.subcategoryID;
		}
		plane.request(requestObject).then(data => data.docs && setProducts(data.docs));
	}, [ids.categoryID, ids.subcategoryID]);

	return (
		<div className='mt-12 mb-[148px]'>
			<div className='wrapper h-screen flex gap-[30px]  '>
				{/* category */}
				<div className='w-72'>
					<ShopCategory setIds={setIds} ids={ids} />
				</div>
				{/* products */}
				<div className='flex-1  '>
					<div className=' grid grid-cols-3'>
						{products &&
							products.map((product) => {
								const { id, images, price, description } = product;
								return (
									<Link
										to={`/home/items/${product.id}`}
										key={id}
									>
										<ProductsCard
											img={images[0]}
											title={description}
											price={price}
											className='  '
										/>
									</Link>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
