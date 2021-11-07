import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HardSkills from "./skills/HardSkills";
import LangSkills from "./skills/LangSkills";
import SoftSkills from "./skills/SoftSkills";

function Skills() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: "FETCH_SKILLS" });
		dispatch({ type: "FETCH_SOFT_SKILLS" });
		dispatch({ type: "FETCH_LANG_SKILLS" });
	}, []);
	return (
		<>
			<HardSkills />
			<SoftSkills />
			<LangSkills />
		</>
	);
}

export default Skills;
