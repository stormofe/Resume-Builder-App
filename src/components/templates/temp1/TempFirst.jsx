import React from "react";
import style from "./TempFirst.module.css";

function TempFirst() {
	return (
		<div>
			<aside>
				<div className={style.info}>
					<div className='img'></div>
					<div className='contacts'>
						<div className='contactsLine'>
							<div className='contactsIcon'></div>
							<div className='contactsText'>
								<h3></h3>
								<p></p>
							</div>
						</div>
					</div>
				</div>
			</aside>
			<main>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum molestias nobis consequatur consequuntur!
				Ducimus dignissimos est aliquid, ullam ipsam voluptates reiciendis nisi, unde natus et eaque a laborum magnam
				asperiores!
			</main>
		</div>
	);
}

export default TempFirst;
