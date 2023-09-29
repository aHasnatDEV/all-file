import React from 'react';

const Youtubecard = ({ videoId }) => {
	return (
		<div className='max-w-screen-md mx-auto'>
			<div className='relative overflow-hidden h-[25rem] w-[17.6875rem]'>
				<iframe
					className='absolute top-0 left-0 h-[25rem] w-[17.6875rem]'
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
					allowFullScreen
					style={{ borderRadius: '12px' }}
				></iframe>
			</div>
		</div>
	);
};

export default Youtubecard;
