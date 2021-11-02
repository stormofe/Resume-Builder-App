import React from "react";

function TempFirst() {
	return (
		<div className='template templateFirst'>
			<aside className='sidebar'>
				<div className='sidebar__info info'>
					<div className='info__img'>
						<img
							src='https://images.unsplash.com/photo-1625201925673-1054ca34b3f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80'
							alt=''
						/>
					</div>
					<div className='info__wrapper'>
						<div className='info__line'>
							<div className='info__icon'>
								<img src='icons/phone.svg' alt='' />
							</div>
							<div className='info__descr'>
								<h3>Phone</h3>
								<p>+84 - 969877097</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src='icons/letter.svg' alt='' />
							</div>
							<div className='info__descr'>
								<h3>Mail</h3>
								<p>toannd.figmateam@gmail.com</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src='icons/world.svg' alt='' />
							</div>
							<div className='info__descr'>
								<h3>Website</h3>
								<p>www.github.com</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src='icons/area.svg' alt='' />
							</div>
							<div className='info__descr'>
								<h3>Area</h3>
								<p>California 90999, United States</p>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default TempFirst;
