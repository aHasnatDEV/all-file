import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user/UserContext';
import Loader from '../assets/LoaderPage/loader.svg';

const ProtectedRouter = ({ children }) => {
	const { userId, loading } = useContext(UserContext);
	const location = useLocation().pathname;

	if (loading) {
		return (
			<div className=''>
				<div className='wrapper h-screen'>
					<img src={Loader} alt='' className=' ' />
				</div>
			</div>
		);
	}

	if (!userId) {
		return (
			<Navigate
				to='/authentication/login'
				state={{ location: location }}
			></Navigate>
		);
	}

	return <>{children}</>;
};

export default ProtectedRouter;
