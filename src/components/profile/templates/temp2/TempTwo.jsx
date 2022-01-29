import React, { useRef } from "react";
import Box from "@mui/material/Box";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import WorkOutlineSharpIcon from "@mui/icons-material/WorkOutlineSharp";
import SportsBasketballSharpIcon from "@mui/icons-material/SportsBasketballSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import InsertLinkSharpIcon from "@mui/icons-material/InsertLinkSharp";
import { v4 as uuidv4 } from "uuid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { IconButton } from "@mui/material";
function TempTwo(props) {
	const info = props.info;
	const { skills, softSkills, langSkills, edu, exp, custom, socials, mainInfo } = info;
	const { photoURL, firstName, lastName, email, about, phone, hobbies, area, position } = mainInfo;
	const componentRef = useRef();
	const pageStyle = `
	p {
		orphans: 3;
	}
	.css-1vsk7cc-MuiGrid-root, .MuiPaper-root {
		page-break-inside: avoid !important;
	}
`;
	return (
		<Box
			ref={componentRef}
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
						<div className='main__info-photo'>{photoURL && <img src={photoURL} alt='Portrait' />}</div>
						<div className='main__info-text'>
							<h1>
								<span>{lastName} </span>
								{firstName}
							</h1>
							<h2>{position}</h2>

							<div className='main__info-contacts contacts'>
								{phone && (
									<div className='contacts__line'>
										<PermPhoneMsgIcon fontSize='inherit' />
										<a href={`tel:${phone}`}>{phone}</a>
									</div>
								)}
								{email && (
									<div className='contacts__line'>
										<EmailIcon fontSize='inherit' />
										<a
											href={`mailto:${email}`}
											style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis" }}>
											{email}
										</a>
									</div>
								)}
								{area && (
									<div className='contacts__line'>
										<MapIcon fontSize='inherit' />
										<a href='#'>{area}</a>
									</div>
								)}
							</div>
						</div>
					</div>
					{exp && exp.length !== 0 && (
						<div className='main__exp exp'>
							<h3 className='exp__title title'>
								<WorkOutlineSharpIcon fontSize='inherit' sx={{ mr: 1 }} />
								WORK EXPERIENCE
							</h3>
							{exp &&
								exp.length !== 0 &&
								exp.map((exp) => (
									<div className='exp__block block' key={uuidv4()}>
										{exp.dateStart ? (
											<div className='block__date'>
												{exp.dateStart}
												<span>
													<KeyboardArrowDownIcon fontSize='inherit' />
												</span>
												{exp.dateEnd}
											</div>
										) : (
											<div className='block__date'>{exp.dateEnd}</div>
										)}
										<div className='block__info info'>
											<h4 className='info__title'>{exp.profession}</h4>
											<p className='info__subtitle'>{exp.where}</p>
											<p className='info__descr'>{exp.description}</p>
										</div>
									</div>
								))}
						</div>
					)}
					{edu && edu.length !== 0 && (
						<div className='main__edu edu'>
							<h3 className='edu__title title'>
								<SchoolSharpIcon fontSize='inherit' sx={{ mr: 1 }} /> EDUCATION
							</h3>
							{edu &&
								edu.length !== 0 &&
								edu.map((edu) => (
									<div className='exp__block block' key={uuidv4()}>
										<div className='block__date'>{edu.date}</div>
										<div className='block__info info'>
											<h4 className='info__title'>{edu.profession}</h4>
											<p className='info__subtitle'>{edu.where}</p>
											<p className='info__descr'>{edu.description}</p>
										</div>
									</div>
								))}
						</div>
					)}

					{custom && custom.length !== 0 && (
						<div className='main__exp exp'>
							<h3 className='exp__title title'>
								<WorkOutlineSharpIcon fontSize='inherit' sx={{ mr: 1 }} />
								Additional Information
							</h3>
							{custom &&
								custom.length !== 0 &&
								custom.map((custom) => (
									<div className='exp__block block' key={uuidv4()}>
										{custom.dateStart ? (
											<div className='block__date'>
												{custom.dateStart}
												<span>
													<KeyboardArrowDownIcon fontSize='inherit' />
												</span>
												{custom.dateEnd}
											</div>
										) : custom.dateEnd ? (
											<div className='block__date'>{custom.dateEnd}</div>
										) : (
											<div className='block__date' style={{ display: "none" }}></div>
										)}
										<div className='block__info info'>
											<h4 className='info__title'>{custom.profession}</h4>
											<p className='info__subtitle'>{custom.where}</p>
											<p className='info__descr'>{custom.description}</p>
										</div>
									</div>
								))}
						</div>
					)}
					{hobbies && (
						<div className='main__hobbies hobbies'>
							<h3 className='hobbies__title title'>
								<SportsBasketballSharpIcon fontSize='inherit' sx={{ mr: 1 }} />
								HOBBIES AND INTERESTS
							</h3>
							<p className='hobbies__descr'>{hobbies}</p>
						</div>
					)}
				</div>
				<aside className='aside'>
					<div className='aside__about'>{about}</div>
					<div className='aside__skills skills'>
						{skills.length !== 0 && <h3 className='skills__title title'>PRO SKILLS</h3>}
						{skills.length !== 0 &&
							skills.map((skill) => (
								<div className='skills__line skill' key={uuidv4()}>
									<p className='skill__title'>{skill[0]}</p>
									<div className='skill__bar'>
										<div className='skill__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
									</div>
								</div>
							))}
					</div>
					<div className='aside__skills skills'>
						{softSkills.length !== 0 && <h3 className='skills__title title'>PERSONAL SKILLS</h3>}
						{softSkills.length !== 0 &&
							softSkills.map((skill) => (
								<div className='skills__line skill' key={uuidv4()}>
									<p className='skill__title'>{skill[0]}</p>
									<div className='skill__bar'>
										<div className='skill__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
									</div>
								</div>
							))}
					</div>
					<div className='aside__skills skills'>
						{langSkills.length !== 0 && <h3 className='skills__title title'>Language skills</h3>}
						{langSkills.length !== 0 &&
							langSkills.map((skill) => (
								<div className='skills__line skill' key={uuidv4()}>
									<p className='skill__title'>{skill[0]}</p>
									<div className='skill__bar'>
										<div className='skill__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
									</div>
								</div>
							))}
					</div>
					{socials && socials.length !== 0 && (
						<div className='aside__socials socials'>
							<h3 className='socials__title title'>FOLLOW ME</h3>
							{socials.map((soc) => (
								<div className='socials__line' key={uuidv4()}>
									<InsertLinkSharpIcon fontSize='inherit' />
									<a href={soc} target='_blank' rel='noreferrer'>
										{soc}
									</a>
								</div>
							))}
						</div>
					)}
				</aside>
			</div>
			<div className='printButton'>
				<ReactToPrint
					trigger={() => (
						<IconButton aria-label='print' size='large'>
							<PrintIcon />
						</IconButton>
					)}
					content={() => componentRef.current}
					pageStyle={pageStyle}
				/>
			</div>
		</Box>
	);
}

export default TempTwo;
