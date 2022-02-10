import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({
	title = "Realm Hunter",
	description = "Description (for SEO)",
	keywords = "keywords,separated,by,comma,just,like,this",
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
			<div className="bg-primary">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
