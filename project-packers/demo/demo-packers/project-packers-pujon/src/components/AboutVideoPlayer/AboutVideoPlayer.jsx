import { useState, useRef } from 'react';

// import play from '../../../assets/icons/Project Packers/play.svg';

// import pasue from '../../../assets/icons/Project Packers/pause.svg';

import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';

const AboutVideoPlayer = ({ url }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const videoRef = useRef(null);

	const [hover, setHover] = useState(true);

	const togglePlay = () => {
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};

    const srsccs = "https://youtu.be/FjM5QZmLRI0"

	return (
		<div
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className='relative'
		>
			<video ref={videoRef} width='100%' height='100%'  >
				<source src={srsccs} type='video/mp4' />
			</video>

			<span className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
				{hover && (
					<button onClick={togglePlay} className="text-5xl" >
						{' '}
						{isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}{' '}
					</button>
				)}
			</span>
		</div>
	);
};

export default AboutVideoPlayer;
