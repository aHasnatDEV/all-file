import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSideBarLink.css';

// all icons
import dashboard from '../../assets/icons/cd-dashboard.svg';
import user from '../../assets/icons/user.svg';
import support from '../../assets/icons/cd-chat.svg';
import staff from '../../assets/icons/cd-order.svg';

/**
 *
 * @param {string} path - receive pathname for navigation
 * @param {string} activeLink - store path for activeStyle
 * @param {object} setActiveLink - set pathName in activeLink
 * @param {string} linkName - receive link name for display link
 * @returns
 */

const AdminSideBarLink = ({ path, activeLink, setActiveLink, linkName }) => {
	let source;
	linkName.toLowerCase() === 'dashboard'
		? (source = dashboard)
		: linkName.toLowerCase() === 'customers'
		? (source = user)
		: linkName.toLowerCase() === 'support'
		? (source = support)
		: linkName.toLowerCase() === 'staff'
		? (source = staff)
		: undefined;

	return (
		<>
			<NavLink
				end={true}
				to={path}
				className={` flex items-center gap-1 `}
				onClick={() => setActiveLink(path)}
			>
				{activeLink === path && <div className='activeLinkStyle_1'></div>}
				<div
					className={` ${
						!source ? 'p-[8px_45px]' : 'p-[8px_12px]'
					}  w-full flex items-center gap-2 ${
						activeLink === path && 'activeLinkStyle_2'
					}`}
				>
					{source && <img src={source} />}
					{linkName}
				</div>
			</NavLink>
		</>
	);
};

export default AdminSideBarLink;
