import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
const NBMonsImage = styled(Image)`
	position: absolute;
	bottom: 0;
	left: -3%;
	bottom: -70px;
	z-index: 1;
`;

const Layout = ({
	title = "Realm Hunter",
	description = "Description (for SEO)",
	keywords = "keywords,separated,by,comma,just,like,this",
	showMonsters = false,
	children,
}) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="shortcut icon" href="imgs/favicon.ico" />
			</Head>
			<Navbar />
			<div className="position-relative">
				{showMonsters && (
					<NBMonsImage
						src="./images/nbmons.png"
						alt="NBMons!"
						className="d-none d-lg-block"
						width={"500px"}
					/>
				)}

				<div className="bg-primary">{children}</div>
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
