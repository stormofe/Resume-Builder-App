import React from "react";
import Box from "@mui/material/Box";
import photo from "../../../../source/user.png";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import WorkOutlineSharpIcon from "@mui/icons-material/WorkOutlineSharp";
import SportsBasketballSharpIcon from "@mui/icons-material/SportsBasketballSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import InsertLinkSharpIcon from "@mui/icons-material/InsertLinkSharp";
function TempTwo() {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 3,
				maxWidth: "650px",
				width: "100%",
				position: "relative",
			}}>
			<div className='templateTwo'>
				<div className='main'>
					<div className='main__info'>
						<div className='main__info-photo'>
							<img src={photo} alt='portrait' />
						</div>
						<div className='main__info-text'>
							<h1>
								<span>JUSTIN</span> NGUYEN
							</h1>
							<h2>DESIGN & FONTEND DEVELOPER</h2>

							<div className='main__info-contacts contacts'>
								<div className='contacts__line'>
									<PermPhoneMsgIcon fontSize='inherit' />
									<a href='#'>84 - 969877097</a>
								</div>
								<div className='contacts__line'>
									<EmailIcon fontSize='inherit' />
									<a href='#'>toannd.figmateam@gmail.com</a>
								</div>
								<div className='contacts__line'>
									<MapIcon fontSize='inherit' />
									<a href='#'>California 90999, United States</a>
								</div>
							</div>
						</div>
					</div>
					<div className='main__exp exp'>
						<h3 className='exp__title title'>
							<WorkOutlineSharpIcon fontSize='inherit' sx={{ mr: 1 }} />
							WORK EXPERIENCE
						</h3>
						<div className='exp__block block'>
							<div className='block__date'>2015</div>
							<div className='block__info info'>
								<h4 className='info__title'>HR MANAGER</h4>
								<p className='info__subtitle'>Bethany Services, Grand Rapids, MI</p>
								<p className='info__descr'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad mzinim veniam, quis nostrud exercitation ullamco laboris.
								</p>
							</div>
						</div>
					</div>
					<div className='main__edu edu'>
						<h3 className='edu__title title'>
							<SchoolSharpIcon fontSize='inherit' sx={{ mr: 1 }} /> EDUCATION
						</h3>
					</div>
					<div className='main__hobbies hobbies'>
						<h3 className='hobbies__title title'>
							<SportsBasketballSharpIcon fontSize='inherit' sx={{ mr: 1 }} />
							HOBBIES AND INTERESTS
						</h3>
						<p className='hobbies__descr'>
							Socialising with firends and family, watching TV (BBC Clic, news and documentaries), playing football on a
							weekly basis, reading non-fiction books, solving puzzles, fishing on the regular basis and computing
							(creating and desiging software and website).
						</p>
					</div>
				</div>
				<aside className='aside'>
					<div className='aside__about'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					</div>
					<div className='aside__skills skills'>
						<h3 className='skills__title title'>PRO SKILLS</h3>
						<div className='skills__line skill'>
							<p className='skill__title'>FIGMA</p>
							<div className='skill__bar'></div>
						</div>
					</div>
					<div className='aside__skills skills'>
						<h3 className='skills__title title'>PERSONAL SKILLS</h3>
						<div className='skills__line skill'>
							<p className='skill__title'>Team work</p>
							<div className='skill__bar'></div>
						</div>
					</div>
					<div className='aside__socials socials'>
						<h3 className='socials__title title'>FOLLOW ME</h3>
						<div className='socials__line'>
							<InsertLinkSharpIcon fontSize='inherit' />
							<a href='#'>dribbble.com/Figmateam</a>
						</div>
						<div className='socials__line'>
							<InsertLinkSharpIcon fontSize='inherit' />
							<a href='#'>dribbble.com/Figmateam</a>
						</div>
					</div>
				</aside>
			</div>
		</Box>
	);
}

export default TempTwo;
