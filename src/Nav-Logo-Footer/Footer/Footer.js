import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-about-container">
					<article>
						<h2>JOA Morocco</h2>
						<p>
							Small-group tours across Morocco led by local guides.
							We take you to the places that matter — and give you the
							time to feel them.
						</p>
					</article>
					<ul>
						<li>
							<a href="mailto:joamorocco@gmail.com">joamorocco@gmail.com</a>
						</li>
						<li>
							<a href="tel:+212600000000">+212 600 000 000</a>
						</li>
						<li>
							<a href="#">Marrakech, Morocco</a>
						</li>
					</ul>
				</div>
				<div className="bottom-declaration">
					© {new Date().getFullYear()} JOA Morocco. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
