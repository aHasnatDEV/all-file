/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo3.png';
import myAcct from '../../assets/Avatar.png';
import NotificationImg from '../../assets/cd-notification.svg';
import Cart1 from '../../assets/cd-products.svg';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink, useLocation } from 'react-router-dom';
import DropDownNotification from '../../components/DropDown/DropDown';
import Notification from '../../pages/Notification/Notification';
import Cart from '../../pages/Cart/Cart';
import { UserContext } from '../../contexts/user/UserContext';
import useDebounce from '../../Hooks/useDebounce';

// TODO: add comment and short it more

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { currentUser: data, userId: isLoggedIn } = useContext(UserContext);
	const isAdmin = useLocation().pathname.includes('admin');
	const toggleCart = () => {
		setIsCartOpen((prevValue) => !prevValue);
	};
	const debouncedToggleCart = useDebounce(toggleCart, 300);
	return (
		<div className='border-b shadow-md relative z-40'>
			<nav
				className={`flex gap-1 max-w-screen-xl mx-auto items-center justify-between
			 bg-white text-black h-20 px-2 md:px-5`}
			>
				{/* button for open navbar in mobile response */}
				{isLoggedIn && (
					<button
						className={`text-2xl ${openMenu && 'hidden'} sm:hidden      `}
						onClick={() => setOpenMenu(true)}
					>
						<AiOutlineMenuUnfold />
					</button>
				)}

				{/* NavMenu in Mobile responsive navmenu*/}
				{isLoggedIn && (
					<div
						className={` absolute z-50 bg-white h-screen w-3/4 top-0 md:hidden transition-all duration-1000 ${openMenu ? ' left-0 opacity-100' : 'h-0 opacity-0 -left-[40rem]'
							}`}
					>
						<div className='px-4 py-10'>
							{/* Logo and button */}
							<div className='flex items-center'>
								<img src={logo2} alt='' className='w-20 md:w-full md:hidden' />
								<Button buttonType='outlineButton' name='Login or Sign up' />
							</div>
							{/*  */}
							<hr className='my-3' />

							{/* all nav menu  */}
							<ul className='space-y-2 md:hidden'>
								{/* my account */}
								<li>
									<NavLink className='flex items-center gap-2'>
										<img src={myAcct} alt='' /> My Account
									</NavLink>
								</li>

								{/* Notification */}
								<li>
									<NavLink className='flex items-center gap-2'>
										<img
											src={NotificationImg}
											alt=''
											className='bg-[#CFF6EF] p-1 rounded-full'
										/>
										Notification
									</NavLink>
								</li>

								{/* Support */}
								<li>
									<NavLink className='flex items-center gap-2'>
										<img
											src={NotificationImg}
											alt=''
											className='bg-[#CFF6EF] p-1 rounded-full'
										/>
										Support
									</NavLink>
								</li>

								{/* LogOut */}
								<li>
									<NavLink className='flex items-center gap-2'>
										<img
											src={NotificationImg}
											alt=''
											className='bg-[#CFF6EF] p-1 rounded-full'
										/>
										Logout
									</NavLink>
								</li>
							</ul>
						</div>

						{/* button for closing navbar in mobile responsive */}
						{isLoggedIn && (
							<button
								onClick={() => setOpenMenu(false)}
								className='absolute -right-10 top-8 text-3xl md:hidden'
							>
								<AiOutlineClose />
							</button>
						)}
					</div>
				)}

				{/* logo for mobile responsive with out opening navmenu */}
				<div>
					<NavLink to={'/home'}>
						<img
							src={logo2}
							alt=''
							className='max-w-[5rem] min-w-[5rem] md:hidden'
						/>
					</NavLink>
				</div>

				{/* for desktop */}
				<div>
					<NavLink to={'/home'}>
						<img src={logo} alt='' className='w-20 md:w-full hidden md:block' />
					</NavLink>
				</div>

				{/* search */}
				<div
					className={`w-auto md:w-2/4 lg:w-3/5 flex px-3 items-center text-ellipsis truncate   ${isAdmin
						? 'rounded-none border-none bg-slate-50'
						: 'border rounded-3xl'
						} `}
				>
					{/* search Icon */}
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className={`h-5 w-5 ${isAdmin ? 'text-[#5C5F62]' : ' text-[#F2C852]'
								}`}
						>
							<path
								fillRule='evenodd'
								d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
								clipRule='evenodd'
							/>
						</svg>
					</span>

					{/* search input */}
					<input
						type='search'
						className='relative m-0 block flex-auto bg-transparent bg-clip-padding ps-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#124E58] outline-none placeholder:text-[#124E58]'
						placeholder={`${isAdmin ? 'Search' : 'Paste the URL of the product'
							}`}
					/>
				</div>

				{/*Conditional button for mobile responsive */}
				<>
					{isLoggedIn ? (
						<NavLink
							to='/home/myAccount/orders'
							className='flex items-center gap-2'
						>
							<img
								src={Cart1}
								alt=''
								className='bg-[#CFF6EF] p-1 rounded-full md:hidden min-w-[2.5rem] max-w-[2.5rem]'
							/>
						</NavLink>
					) : (
						<Button
							buttonType='secondaryButton'
							name='Login'
							className={'block md:hidden'}
						/>
					)}
				</>

				{/* for desktop */}
				<div className='md:flex items-center space-x-2 hidden'>
					<p>Support</p>

					{isLoggedIn ? (
						<ul className='flex items-center gap-2'>
							{/* Notification */}
							<li className='relative'>
								<button
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									className='flex items-center gap-2'
								>
									<img
										src={NotificationImg}
										alt=''
										className='bg-[#CFF6EF] p-1 rounded-full'
									/>
								</button>

								<div>
									<DropDownNotification
										setIsOpen={setIsOpen}
										isOpen={isOpen}
										isNotification={true}
									>
										<Notification isNavbar={true} />
									</DropDownNotification>
								</div>
							</li>

							{/* Cart */}
							<li className='relative'>
								<button
									onClick={() => {
										debouncedToggleCart();
									}}
									className='flex items-center gap-2'
								>
									<img
										src={Cart1}
										alt=''
										className='bg-[#CFF6EF] p-1 rounded-full'
									/>
								</button>

								<div>
									<DropDownNotification
										setIsOpen={setIsCartOpen}
										isOpen={isCartOpen}
										isNotification={false}
									>
										<Cart isCartOpen={isCartOpen} isNavbar={true} />
									</DropDownNotification>
								</div>
							</li>

							{/* Account */}
							<li>
								<NavLink
									to='/home/myAccount/orders'
									className='flex items-center gap-2'
								>
									<img src={myAcct || data?.avatar} alt='' />
								</NavLink>
							</li>
							<li>{data?.fullName}</li>
						</ul>
					) : (
						<div className='flex items-center gap-2'>
							<Link to='/authentication/login'>
								<Button buttonType='outlineButton' name='Login' />
							</Link>
							<Link to='/authentication/signup'>
								<Button name='Sign Up' />
							</Link>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
