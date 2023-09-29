// import Modal from "../../components/Modal/Modal";

import FAQs from '../../components/FAQs/FAQs';
import Modal from '../../components/Modal/Modal';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import Header from '../../container/Header/Header';

import card1 from '../../assets/card1.png';
import BlogCard1 from '../../assets/Blog1.png';
import BlogCard from '../../components/BlogCard/BlogCard';

// import Button from '../../components/Button/Button';
import Headings from '../../components/Headings/Headings';
import AboutFAQs from '../../components/AboutFAQs/AboutFAQs';
import Status from '../../components/Status/Status';
import PopUpCard from '../../components/PopUpCard/PopUpCard';
import { useEffect, useState } from 'react';
import OverviewCard from '../../components/OverviewCard/OverviewCard';
import ChatBox from '../../components/ChatBox/ChatBox';
import Chat from '../../components/Chat/Chat';
import ChatJoin from '../../components/ChatJoin/ChatJoin';
import StaffCard from '../../components/StaffCard/StaffCard';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import Notification from '../Notification/Notification';
import CartCard from '../../components/CartCard/CartCard';

import cart11 from '../../assets/cart1.png';
import Table from '../../components/Table/Table';
// import InputField from '../../components/InputField/InputField';
import FormWithValidation from '../../components/Try/Buttonn';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField/InputField';
// import InputField from '../../components/InputField/InputField';
// import { InputField } from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const Home = () => {
	const [showPopUp, setShowPopUp] = useState(false);

	const date = new Date();
	// console.log(date.getMinutes());
	const sendingMin = date.getMinutes();

	// console.log(typeof setShowPopUp  );

	const handleCheck = (k) => {
		console.log(k);
	};

	const handleClick = () => {
		console.log('clicked');
	};

	const handleBlr = () => {
		console.log('blured');
	};

	const handleMouseHover = () => {
		console.log('mouseHover');
	};

	const handeMouseMoveCapture = () => {
		console.log('ccaptured');
	};

	const [cusotmer, setCusontmer] = useState([]);

	const arr = [];

	useEffect(() => {
		fetch(
			'https://dff5794c-3698-4de1-8334-ba068985722f.mock.pstmn.io/api/order',
		)
			.then((res) => res.json())
			.then((d) => {
				d.docs.map((data) => {
					const orderID = data.id;
					const userName = data.user.fullName;
					const productName = data.products[0].product.productName;
					const quantity = data.products[0].quantity;
					const total = data.totalprice;
					const status = data.status;
					const date = data.trxID;

					const tableData = {
						'order ID': orderID,
						customer: userName,
						'product name': productName,
						quantity: quantity,
						total: total,
						status: status,
						data: date,
					};

					// console.log(tableData);

					// arr.push(tableData);
					// setCusontmer([prev=>{...prev}]);
					setCusontmer((oldArray) => [...oldArray, tableData]);
					// console.log(
					// 	orderID,
					// 	userName,
					// 	productName,
					// 	quantity,
					// 	total,
					// 	status,
					// 	date,
					// );
				});
			});
	}, []);

	// const [, set] = useState(second)

	// console.log(arr[0]);
	// console.log(arr.length);

	// console.log(cusotmer);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const name = 'text';

	// console.log("in home", errors[name])

	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className='wrapper bg-slate-500'>
			<div className='wrapper'>
				{cusotmer && cusotmer.length && <Table data={cusotmer} />}

				<InputField
					inputType='text'
					placeHolder='********'
					inputLabel='Name'
					id='name'
					name='name'
					onChange={handleChange}
				/>

				{/* <FormWithValidation /> */}

				<CartCard
					ProductQuantity={1}
					productImg={cart11}
					price={12212132}
					productName='OUTERBOX COMPUTER SERIES Case for iPhone 12 & iPhone 12 pro'
				/>

				<OverviewCard
					title='Total Cost'
					amount={10440}
					deatails='New const in total 30 days'
				/>
				<OverviewCard
					title='Total Request'
					amount={10440}
					deatails='New const in total 30 days'
				/>
				<OverviewCard
					title='Total Order'
					amount={10440}
					deatails='New const in total 30 days'
				/>
				<OverviewCard
					title='Completed'
					amount={10440}
					deatails='New const in total 30 days'
				/>
				<OverviewCard
					title='Canceled'
					amount={10440}
					deatails='New const in total 30 days'
				/>

				<AboutFAQs
					aboutQuestion='Tell us the item your are looking for'
					aboutAnswer='Thousand of deals  on gadgets, shoes, cosmetics, watches - everything from the US'
				/>

				<Headings
					title='Trending products on Project Packers'
					subTitle='Get inpiredd by what people in your city are buying from abroad with the biggest savings'
				/>

				<Modal modalBody={<>Pujon Das Auvi</>} openButtonName='Open Modal' />
				<Header />

				<NotificationCard
					icon={card1}
					message="We've reviewed item #3163652 (Fitbit Versa...). You can now take it to checkout!"
					time={sendingMin}
					type='cart'
				/>

				<Chat
					isSender={false}
					image={card1}
					name='Pujon Das Auvi'
					time='4:55pm'
					message="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
				/>

				<div className='flex items-center justify-center'>
					<ChatJoin
						image={card1}
						name='Pujon Das Auvi'
						dateTime='13 Apr 2023, 2:50pm'
					/>
				</div>
				<Chat
					isSender={true}
					image={card1}
					name='Pujon Das Auvi'
					time='4:55pm'
					message="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
				/>

				<ChatBox
					onClick={() => handleCheck('Pujon')}
					isActive={false}
					title='Refund'
					ID={123423423}
					message='why is this? why not lalalafsdhkfhfdksfsfsahjlkfhsalkhsljdkfhsaklfhasdkfsa'
					isOpen={false}
				/>

				<StaffCard image={card1} name='Pujon Das Auvi' access='Full Access' />

				<Button
					buttonType='secondaryButton'
					className='rounded'
					name='Open PopUp'
					onClick={() => setShowPopUp(true)}
				/>

				<PopUpCard
					title='You got a new request'
					details="Upload your store's logo, change colors and fonts, and more."
					time={1}
					openButtonName='Open Modal'
					showPopUp={showPopUp}
					setShowPopUp={setShowPopUp}
				/>

				<Status title='Completed' />
				<Status title='Paid' />

				<Button
					buttonType=''
					className='rounded-md'
					name='primaryButton'
					onClick={handleClick}
					onBlur={handleBlr}
					onMouseMove={handleMouseHover}
					onMouseMoveCapture={handeMouseMoveCapture}
				/>
				<Button
					buttonType='secondaryButton'
					className=''
					name='secondaryButton'
					onClick={handleClick}
					onBlur={handleBlr}
					onMouseMove={handleMouseHover}
					onMouseMoveCapture={handeMouseMoveCapture}
				/>
				<Button
					buttonType='outlineBUtton'
					className=''
					name='outlineButton'
					onClick={handleClick}
					onBlur={handleBlr}
					onMouseMove={handleMouseHover}
					onMouseMoveCapture={handeMouseMoveCapture}
				/>

				<FAQs question='FAQs is not working. Why?' answer="I don't knwo" />
				<ProductsCard
					img={card1}
					title='iConnect by timex active smartWatch'
					price={28.95}
				/>
				<BlogCard
					img={BlogCard1}
					title='Validate your product and market'
					details='You have a great product. Now its time to test your Idea to see if it can become a business'
				/>

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <InputField errors={errors} label='name' name="name" {...register("name", { required: true })} /> */}
					<InputField
						placeholder='Enter your text here'
						onChange={handleChange}
						name='text'
						type='text'
						errors={errors}
						register={register}
						required={true}
						label='text'
					/>
					{/* {errors.text && <span>This field is required</span>} */}

					<Button buttonType='secondaryButton' name='submit'>
						{' '}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Home;
