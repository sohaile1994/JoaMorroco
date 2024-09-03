import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-about-container">
					<article>
						<h2>JOA</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipi. Suspend isse
							ultrices hendrerit nunc vitae vel a sodales. Ac lectus vel risus
							suscipit venenatis.
						</p>
					</article>
					<ul>
						<li>
							<a href="">580 Riverview Dr, Columbus, OH</a>
						</li>
						<li>
							<a href="">
								USA<span>(+1) 614-380-9363 </span>
							</a>
						</li>
						<li>
							<a href="">joamorocco@gmail.com</a>
						</li>
					</ul>
				</div>
				<div className="bottom-declaration">
					© 2017 Qode Interactive, All Rights Reserved
				</div>
			</div>
		</footer>
	);
};

export default Footer;
