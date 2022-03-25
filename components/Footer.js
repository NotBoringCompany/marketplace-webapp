import React from "react";
import { TextSecondary } from "./Typography/Texts";
import Container from "react-bootstrap/Container";
const Footer = () => {
	return (
		<div className="py-4 d-flex bg-primaryComplement">
			<Container className="bg-primaryComplement w-100 d-flex">
				<TextSecondary className="text-white mx-auto">
					This is a footer &copy; NBCompany 2022
				</TextSecondary>
			</Container>
		</div>
	);
};

export default Footer;
