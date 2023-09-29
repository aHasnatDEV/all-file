import React from 'react';
import FAQs from '../../../components/FAQs/FAQs';
import Headings from '../../../components/Headings/Headings';

const FAQsPage = () => {
	return (
		<div className='min-h-[428px] py-[148px]'>
			<div className='wrapper'>
				<Headings title='Frequently Asked Questions' />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-[31px]'>
					<div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
					</div>
					<div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
					</div>
					<div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
						<div>
							<FAQs
								question='Frequently Asked Questions'
								answer='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FAQsPage;
