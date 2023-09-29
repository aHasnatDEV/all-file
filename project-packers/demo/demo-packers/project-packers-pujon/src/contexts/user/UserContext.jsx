import { createContext, useEffect, useState } from 'react';
import { plane } from '../terminal/Terminal';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentUser, setCuredUser] = useState();

	const Login = (userCred) => {
		setLoading(true);
		return plane.request({ name: 'logIn', body: userCred });
	};

	// TODO: SignUp and logout need to be complete

	const SignUp = (userInfo) => { };

	const Logout = () => {
		setLoading(true);
		plane.request({ name: 'logOut' }).then(data => {
			if (data.status) {
				setUserId(null)
				setCuredUser()
				setLoading(false);
			}
			return data.status;
		})
	};

	const user = {
		userId,
		setUserId,
		setCuredUser,
		loading,
		Login,
		SignUp,
		Logout,
		currentUser,
	};

	useEffect(() => {
		plane.request({ name: 'fetchUser' }).then((data) => {
			if (data.id) {
				setCuredUser(data);
				setUserId(data.id);
				plane.socket.connect();
			}
			setLoading(false);
		});
	}, [userId]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// // initialize state
// const initialState = {
// 	user: {
// 		email: null,
// 		fullName: null,
// 		id: null,
// 		role: null,
// 		access: null,
// 		avatar: null,
// 	},
// 	isLoading: true,
// };

// // reducer
// const UserReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'SAVE_USER':
// 			return {
// 				user: {
// 					email: action.payload.email,
// 					fullName: action.payload.fullName,
// 					id: action.payload.id,
// 					role: action.payload.role,
// 					access: action.payload?.access,
// 					avatar: action.payload?.avatar,
// 				},
// 				isLoading: false,
// 			};
// 		case 'REMOVE_USER':
// 			return {
// 				user: {
// 					email: null,
// 					fullName: null,
// 					id: null,
// 					role: null,
// 					access: null,
// 					avatar: null,
// 				},
// 				isLoading: false,
// 			};
// 		default:
// 			return {
// 				...state,
// 				isLoading: false,
// 			};
// 	}
// };

// const [state, dispatch] = useReducer(UserReducer, initialState);

// console.log(state);
