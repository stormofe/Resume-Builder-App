import React from "react";
import letter from "./icons/letter.svg";
import world from "./icons/world.svg";
import area from "./icons/area.svg";
import phone from "./icons/phone.svg";

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
								<img src={phone} alt='' />
							</div>
							<div className='info__descr'>
								<h3>Phone</h3>
								<p>+84 - 969877097</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src={letter} alt='' />
							</div>
							<div className='info__descr'>
								<h3>Mail</h3>
								<p>toannd.figmateam@gmail.com</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src={world} alt='' />
							</div>
							<div className='info__descr'>
								<h3>Website</h3>
								<p>www.github.com</p>
							</div>
						</div>
						<div className='info__line'>
							<div className='info__icon'>
								<img src={area} alt='' />
							</div>
							<div className='info__descr'>
								<h3>Area</h3>
								<p>California 90999, United States</p>
							</div>
						</div>
					</div>
				</div>
				<div className='sidebar__skills skills'>
					<div className='skills__wrapper'>
						<h2>Skills</h2>
						<div className='skills__line'>
							<div className='skills__name'>Figma</div>
							<div className='skills__value'></div>
						</div>
						<div className='skills__line'>
							<div className='skills__name'>Photoshop</div>
							<div className='skills__value'></div>
						</div>
						<div className='skills__line'>
							<div className='skills__name'>Illustrator</div>
							<div className='skills__value'></div>
						</div>
						<div className='skills__line'>
							<div className='skills__name'>HTML/CSS</div>
							<div className='skills__value'></div>
						</div>
						<div className='skills__line'>
							<div className='skills__name'>Fontend</div>
							<div className='skills__value'></div>
						</div>
					</div>
					<div className='skills__wrapper'>
						<h2>Languages</h2>
						<div className='skills__line'>
							<div className='skills__name'>English</div>
							<div className='skills__value'></div>
						</div>
						<div className='skills__line'>
							<div className='skills__name'>Russian</div>
							<div className='skills__value'></div>
						</div>
					</div>
					<div className='skills__wrapper'>
						<h2>Hobbies</h2>
						<p>Socialising with firends and family, playing football, reading non-fiction books,and computing </p>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default TempFirst;
