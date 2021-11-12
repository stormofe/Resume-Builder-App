import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import iconMail from "./icons/icon-mail.svg";

function TempSecond() {
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
    size: auto;
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
			{info && Object.keys(info).length !== 0 ? (
				<div>
					<div ref={componentRef} className='template templateSecond'>
						<aside className='sidebar'>
							{photoURL ? (
								<div className='sidebar__photo'>
									<img src={photoURL} alt='' />
								</div>
							) : (
								""
							)}
							{about ? (
								<div className='sidebar__about block'>
									<h2>About</h2>
									<p>{about}</p>
								</div>
							) : (
								""
							)}

							{softSkills && Object.keys(softSkills).length !== 0 ? (
								<div className='sidebar__skills skills block'>
									<h2>Soft skills</h2>
									{Object.entries(softSkills).map((skill, index) => (
										<div key={index} className='skills__line'>
											<h3>{skill[1][0]}</h3>
											<div className='skills__value'>
												<div
													className='skills__range'
													style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
								</div>
							) : (
								""
							)}
							{skills && Object.keys(skills).length !== 0 ? (
								<div className='sidebar__skills skills block'>
									<h2>Hard skills</h2>
									{Object.entries(skills).map((skill, index) => (
										<div className='skills__line'>
											<h3>{skill[1][0]}</h3>
											<div className='skills__value'>
												<div
													className='skills__range'
													style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
								</div>
							) : (
								""
							)}
							{langSkills && Object.keys(langSkills).length !== 0 ? (
								<div className='sidebar__skills skills block'>
									<h2>Languages</h2>
									{Object.entries(langSkills).map((skill, index) => (
										<div className='skills__line'>
											<h3>{skill[1][0]}</h3>
											<div className='skills__value'>
												<div
													className='skills__range'
													style={{ width: `${Math.floor(Number(skill[1][1]) * 20)}%` }}></div>
											</div>
										</div>
									))}
								</div>
							) : (
								""
							)}
							<div className='sidebar__social social block'>
								<h2>Social media</h2>
								<div className='social__line'>
									<div className='social__icon'>
										<img src={iconMail} alt='' />
									</div>
									<a href='' className='social__link'>
										github.com
									</a>
								</div>
							</div>
						</aside>
						<main className='main'>
							<div className='main__prof'> {position || ""}</div>
							<h1>{name}</h1>
							<div className='main__block block'>
								{exp && Object.keys(exp).length !== 0 ? (
									<>
										<h2>Experience</h2>
										{Object.entries(exp).map((exp, index) => (
											<div className='block__wrapper' key={index}>
												<p className='block__date'>
													{" "}
													{exp[1].dateFrom} - {exp[1].dateEnd}
												</p>
												<div className='block__info info'>
													<div className='info__title'>{exp[1].profession}</div>
													<p className='info__company'>{exp[1].where}</p>
													<p className='info__descr'>{exp[1].description}</p>
												</div>
											</div>
										))}
									</>
								) : (
									""
								)}
							</div>
							<div className='main__block block'>
								{edu && Object.keys(edu).length !== 0 ? (
									<>
										<h2>Experience</h2>
										{Object.entries(edu).map((edu, index) => (
											<div className='block__wrapper' key={index}>
												<p className='block__date'>{edu[1].data}</p>
												<div className='block__info info'>
													<div className='info__title'>{edu[1].profession}</div>
													<p className='info__company'>{edu[1].where}</p>
													<p className='info__descr'>{edu[1].description}</p>
												</div>
											</div>
										))}
									</>
								) : (
									""
								)}
							</div>
							<div className='main__block block'>
								{custom && Object.keys(custom).length !== 0 ? (
									<>
										<h2>Additional Information </h2>
										{Object.entries(custom).map((block, index) => (
											<div className='block__wrapper' key={index}>
												<p className='block__date'>
													{block[1].dateFrom} - {block[1].dateEnd}
												</p>
												<div className='block__info info'>
													<div className='info__title'>{block[1].name}</div>
													<p className='info__company'>{block[1].obj}</p>
													<p className='info__descr'>{block[1].description}</p>
												</div>
											</div>
										))}
									</>
								) : (
									""
								)}
							</div>
						</main>
					</div>
					<ReactToPrint
						trigger={() => <button>Print this out!</button>}
						content={() => componentRef.current}
						pageStyle={pageStyle}
					/>
				</div>
			) : (
				<p>Заполните формы в профиле!</p>
			)}
		</>
	);
}

export default TempSecond;
