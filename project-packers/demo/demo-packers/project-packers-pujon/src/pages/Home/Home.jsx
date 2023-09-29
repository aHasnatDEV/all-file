import React from 'react';
import Brands from '../../container/HomeContainer/Brands/Brands';
import Header from '../../container/HomeContainer/Header/Header';
import PackersWorks from '../../container/HomeContainer/PackersWorks/PackersWorks';
import TrendingProducts from '../../container/HomeContainer/TrendingProducts/TrendingProducts';
import FAQsPage from '../Blog/FAQsPage/FAQsPage';

const Home = () => {
	return (
		<>
			<Header />
			<Brands />
			<TrendingProducts />
			<PackersWorks />
			<FAQsPage />
		</>
	);
};

export default Home;
