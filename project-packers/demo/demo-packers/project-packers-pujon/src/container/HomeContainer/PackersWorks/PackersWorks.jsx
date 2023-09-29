import React from 'react';
import AboutFAQs from '../../../components/AboutFAQs/AboutFAQs';
import AboutVideoPlayer from '../../../components/AboutVideoPlayer/AboutVideoPlayer';

const PackersWorks = () => {
	return (
		<div className='bg-[#CFF6EF]'>
			<div className='wrapper p-[100px]'>
				<div className='flex gap-16 flex-col md:flex-row'>
					<div className='flex-1 text-[#0D3D4B]'>
						{/* title */}
						<div className='text-4xl font-semibold ' >How Project Packers works</div>
						{/* subtitle */}
						<div className='text-lg font-normal mt-4 mb-8' >
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
							commodi, sint repellendus doloribus atque, illum quod quisquam cum
							alias vitae ratione. Odio cumque quidem sint nemo deserunt
							adipisci repellat nesciunt?
						</div>
                        <div className='bg-sky-400 rounded-[24px]' >
                            <AboutVideoPlayer url="https://youtu.be/FjM5QZmLRI0" />
                        </div>

					</div>
					<div className='flex flex-col flex-1 gap-12'>
						<AboutFAQs
							aboutQuestion='Tell us about the item you are looking for'
							aboutAnswer='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
						/>
						<AboutFAQs
							aboutQuestion='Tell us about the item you are looking for'
							aboutAnswer='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
						/>
						<AboutFAQs
							aboutQuestion='Tell us about the item you are looking for'
							aboutAnswer='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
						/>
						<AboutFAQs
							aboutQuestion='Tell us about the item you are looking for'
							aboutAnswer='Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US.'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PackersWorks;
