import React from 'react';
import Status from '../Status/Status';
import './Table.css';

const Table = ({ data }) => {
	// console.log(data);

	// console.log(data);

	return (
		<div className='wrapper'>
			<table className='w-[1136px]'>
				<thead>
					<tr>
						<th className='border-y py-2 text-start '>
							<input type='checkbox' />
						</th>
						{Object.keys(data[0]).map((key, index) => {
							return (
								<React.Fragment key={index}>
									<th className='border-y py-2 text-start '>
										{key[0].toUpperCase() + key.slice(1)}
									</th>
								</React.Fragment>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data.map((item, i) => {
						return (
							<tr key={i} className='border-b py-8'>
								<td>
									<input type='checkbox' />
								</td>
								{Object.keys(item).map((key, index) => {
									return (
										<td key={index} className='text-start'>
											{/* {console.log(key)} */}

											{key === 'status' ? (
												<Status title={item[key]} />
											) : (
												item[key]
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
