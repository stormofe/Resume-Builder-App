import React, { useEffect, useRef } from "react";
import letter from "./icons/letter.svg";
import world from "./icons/world.svg";
import areaIcon from "./icons/area.svg";
import phoneIcon from "./icons/phone.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";

function TempFirst(props) {
	const info = props.info;
	const { skills, softSkills, langSkills, edu, exp, custom, socials, mainInfo } = info;
	const { photoURL, firstName, lastName, email, about, phone, hobbies, area, position } = mainInfo;
	const dispatch = useDispatch();
	console.log(softSkills);
	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, []);

	const componentRef = useRef();
	const pageStyle = `
	@page {
		padding: 1cm;
		margin: 0;
	}
	#pageborder {
      position:fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-bottom: 16px solid #EFB815;
    }

`;

	return (
		<>
			<div ref={componentRef} className='template templateFirst'>
				<aside className='sidebar'>
					<div className='sidebar__info info'>
						<div className='info__img'>{photoURL && <img src={photoURL} alt='' />}</div>
						<div className='info__wrapper'>
							{phone && (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={phoneIcon} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Phone</h3>
										<p>{phone}</p>
									</div>
								</div>
							)}

							{email && (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={letter} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Mail</h3>
										<p>{email}</p>
									</div>
								</div>
							)}
							{socials && socials.length !== 0 && (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={world} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Websites</h3>
										{socials.map((soc, index) => (
											<div key={index}>
												<a target='_blank' href={`${soc}`} rel='noreferrer'>
													{soc}
												</a>{" "}
											</div>
										))}
									</div>
								</div>
							)}
							{area && (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={areaIcon} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Area</h3>
										<p>{area}</p>
									</div>
								</div>
							)}
						</div>
					</div>
					{skills || softSkills || langSkills ? (
						<div className='sidebar__skills skills'>
							<div className='skills__wrapper'>
								{skills.length !== 0 || softSkills.length !== 0 ? <h2>Skills</h2> : ""}

								{skills.length !== 0 &&
									skills.map((skill, index) => (
										<div key={index} className='skills__line'>
											<div className='skills__name'>{skill[0]}</div>
											<div className='skills__value'>
												<div className='skills__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
								{softSkills.length !== 0 &&
									softSkills.map((skill, index) => (
										<div key={index} className='skills__line'>
											<div className='skills__name'>{skill[0]}</div>
											<div className='skills__value'>
												<div className='skills__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
							</div>
							<div className='skills__wrapper'>
								{langSkills.length !== 0 && <h2>Languages</h2>}
								{langSkills.length !== 0 &&
									langSkills.map((skill, index) => (
										<div key={index} className='skills__line'>
											<div className='skills__name'>{skill[0]}</div>
											<div className='skills__value'>
												<div className='skills__range' style={{ width: `${Math.floor(Number(skill[1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
							</div>
							{hobbies && (
								<div className='skills__wrapper'>
									<h2>Hobbies</h2>
									<p>{hobbies} </p>
								</div>
							)}
						</div>
					) : (
						""
					)}
				</aside>
				<main className='main'>
					<div className='main__box'>
						<h1 className='main__name'>
							<span>{lastName} </span>
							{firstName}
						</h1>
						<p className='main__prof'>{position}</p>
					</div>
					{about && (
						<div className='main__block block'>
							<h2>About me</h2>
							<article className='block__descr'>{about}</article>
						</div>
					)}
					<div className='main__block block'>
						{exp && exp.length !== 0 && <h2>EXPERIENCE</h2>}
						{exp &&
							exp.length !== 0 &&
							exp.map((exp, index) => (
								<div key={index} className='block__column column'>
									<h3>{exp.profession}</h3>
									<div className='column__line'>
										<p>{exp.where}</p>
										<p>
											<span>
												{exp.dateStart && `${exp.dateStart} -`}
												{exp.dateEnd}
											</span>
										</p>
									</div>
									<p className='column__descr'>{exp.description}</p>
								</div>
							))}
					</div>
					<div className='main__block block'>
						{edu && edu.length !== 0 && <h2>Education</h2>}
						{edu &&
							edu.length !== 0 &&
							edu.map((edu, index) => (
								<div key={index} className='block__column column'>
									<h3>{edu.profession}</h3>
									<div className='column__line'>
										<p>{edu.where}</p>
										<p>
											<span>{edu.date}</span>
										</p>
									</div>
									<p className='column__descr'>{edu.description}</p>
								</div>
							))}
					</div>
					<div className='main__block block'>
						{custom && custom.length !== 0 && <h2>Additional Information</h2>}
						{custom &&
							custom.length !== 0 &&
							custom.map((block, index) => (
								<div key={index} className='block__column column'>
									<h3>{block.profession}</h3>
									<div className='column__line'>
										<p>{block.where}</p>
										<p>
											<span>
												{block.dateStart && `${block.dateStart} -`}
												{block.dateEnd}
											</span>
										</p>
									</div>
									<p className='column__descr'>{block.description}</p>
								</div>
							))}
					</div>
				</main>
			</div>
			<div id='pageborder'></div>
			{/*<ReactToPrint
				trigger={() => <button>Print this out!</button>}
				content={() => componentRef.current}
				pageStyle={pageStyle}
			/>*/}
		</>
	);
}

export default TempFirst;
