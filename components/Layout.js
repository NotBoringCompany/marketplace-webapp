import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import { mediaBreakpoint } from "utils/breakpoints";

const NBMonsImage = styled(Image)`
	position: absolute;
	bottom: 0;
	left: -3%;
	bottom: -70px;
	z-index: 1;
	width: 400px;
	@media ${mediaBreakpoint.down.xl} {
		width: 310px;
	}
`;

const Layout = ({
	title = "Realm Hunter",
	description = "Description (for SEO)",
	keywords = "keywords,separated,by,comma,just,like,this",
	showMonsters = false,
	showSubnav = false,
	children,
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="shortcut icon" href="imgs/favicon.ico" />
			</Head>
			<Navbar showSubnav={showSubnav} />
			<div className="position-relative">
				{showMonsters && (
					<NBMonsImage
						src="./images/nbmons.png"
						alt="NBMons!"
						className="d-none d-lg-block"
					/>
				)}
				<div className="bg-primary" style={{ minHeight: "100vh" }}>
					{children}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Layout;
