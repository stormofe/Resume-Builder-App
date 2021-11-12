import React, { useEffect, useRef } from "react";
import letter from "./icons/letter.svg";
import world from "./icons/world.svg";
import areaIcon from "./icons/area.svg";
import phoneIcon from "./icons/phone.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function TempFirst() {
	const info = useSelector((s) => s.user);
	const {
		name,
		phone,
		email,
		website,
		area,
		position,
		about,
		skills,
		hobbies,
		edu,
		exp,
		langSkills,
		softSkills,
		custom,
		photoURL,
	} = info;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "GET_INFO" });
		dispatch({ type: "GET_PHOTO" });
	}, []);

	const componentRef = useRef();
	const pageStyle = `
  @page {
    size: A4;
	 margin: 0mm;
	 width: 100%;
	 bleed: 1.5cm;
  }
  @media all {
	.pagebreak {
	  display: none;
	}
 }
 @media print {
	.pagebreak {
	  page-break-before: always;
	}
 }

`;

	return (
		<>
			<div ref={componentRef} className='template templateFirst'>
				<aside className='sidebar'>
					<div className='sidebar__info info'>
						<div className='info__img'>{photoURL ? <img src={photoURL} alt='' /> : ""}</div>
						<div className='info__wrapper'>
							{phone ? (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={phoneIcon} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Phone</h3>
										<p>{phone}</p>
									</div>
								</div>
							) : (
								""
							)}

							{email ? (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={letter} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Mail</h3>
										<p>{email}</p>
									</div>
								</div>
							) : (
								""
							)}
							{website ? (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={world} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Website</h3>
										<p>{website}</p>
									</div>
								</div>
							) : (
								""
							)}
							{area ? (
								<div className='info__line'>
									<div className='info__icon'>
										<img src={areaIcon} alt='' />
									</div>
									<div className='info__descr'>
										<h3>Area</h3>
										<p>{area}</p>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
					{skills || softSkills || langSkills ? (
						<div className='sidebar__skills skills'>
							<div className='skills__wrapper'>
								{Object.keys(skills).length !== 0 || Object.keys(softSkills).length !== 0 ? <h2>Skills</h2> : ""}

								{Object.keys(skills).length !== 0
									? Object.entries(skills).map((skill, index) => (
											<div key={index} className='skills__line'>
												<div className='skills__name'>{skill[1][0]}</div>
												<div className='skills__value'>
													<div
														className='skills__range'
														style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
												</div>
											</div>
									  ))
									: ""}
								{Object.keys(softSkills).length !== 0
									? Object.entries(softSkills).map((skill, index) => (
											<div key={index} className='skills__line'>
												<div className='skills__name'>{skill[1][0]}</div>
												<div className='skills__value'>
													<div
														className='skills__range'
														style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
												</div>
											</div>
									  ))
									: ""}
							</div>
							<div className='skills__wrapper'>
								{Object.keys(langSkills).length !== 0 ? <h2>Languages</h2> : ""}
								{Object.keys(langSkills).length !== 0
									? Object.entries(langSkills).map((skill, index) => (
											<div key={index} className='skills__line'>
												<div className='skills__name'>{skill[1][0]}</div>
												<div className='skills__value'>
													<div
														className='skills__range'
														style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
												</div>
											</div>
									  ))
									: ""}
							</div>
							{hobbies ? (
								<div className='skills__wrapper'>
									<h2>Hobbies</h2>
									<p>{hobbies} </p>
								</div>
							) : (
								""
							)}
						</div>
					) : (
						""
					)}
				</aside>
				<main className='main'>
					<div className='main__box'>
						<h1 className='main__name'>
							{/*<span>Justin</span> Nguen*/}
							{name}
						</h1>
						<p className='main__prof'>{position}</p>
					</div>

					<div className='main__block block'>
						<h2>About me</h2>
						<article className='block__descr'>{about}</article>
					</div>
					<div className='main__block block'>
						{exp && Object.keys(exp).length !== 0 ? <h2>EXPERIENCE</h2> : ""}
						{exp && Object.keys(exp).length !== 0
							? Object.entries(exp).map((exp, index) => (
									<div key={index} className='block__column column'>
										<h3>{exp[1].profession}</h3>
										<div className='column__line'>
											<p>{exp[1].where}</p>
											<p>
												<span>
													{exp[1].dateFrom} - {exp[1].dateEnd}
												</span>
											</p>
										</div>
										<p className='column__descr'>{exp[1].description}</p>
									</div>
							  ))
							: ""}
					</div>
					<div className='main__block block'>
						{edu && Object.keys(edu).length !== 0 ? <h2>Education</h2> : ""}
						{edu && Object.keys(edu).length !== 0
							? Object.entries(edu).map((edu, index) => (
									<div key={index} className='block__column column'>
										<h3>{edu[1].profession}</h3>
										<div className='column__line'>
											<p>{edu[1].where}</p>
											<p>
												<span>{edu[1].data}</span>
											</p>
										</div>
										<p className='column__descr'>{edu[1].description}</p>
									</div>
							  ))
							: ""}
					</div>
					<div className='main__block block'>
						{custom && Object.keys(custom).length !== 0 ? <h2>Additional Information</h2> : ""}
						{custom && Object.keys(custom).length !== 0
							? Object.entries(custom).map((block, index) => (
									<div key={index} className='block__column column'>
										<h3>{block[1].name}</h3>
										<div className='column__line'>
											<p>{block[1].obj}</p>
											<p>
												<span>{block[1].dateFrom}</span>
											</p>
											<p>
												<span>{block[1].dateEnd}</span>
											</p>
										</div>
										<p className='column__descr'>{block[1].description}</p>
									</div>
							  ))
							: ""}
					</div>
				</main>
			</div>
			<ReactToPrint
				trigger={() => <button>Print this out!</button>}
				content={() => componentRef.current}
				pageStyle={pageStyle}
				bodyClass='border'
			/>
		</>
	);
}

export default TempFirst;
