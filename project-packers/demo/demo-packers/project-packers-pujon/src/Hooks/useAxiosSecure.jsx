import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {
	const axiosSecure = axios.create({
		baseURL: 'http://localhost:4000/api/',
		withCredentials: true,
	});

	return [axiosSecure];
};

export default useAxiosSecure;
