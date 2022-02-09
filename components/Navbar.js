import React from "react";
import styled from "styled-components";

import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import MyButton from "./Buttons/Button";
import { HeadingSuperXXS } from "./Typography/Headings";
import { menu } from "./Navbar/menu";

const StyledNav = styled(Navbar)`
	width: 100%;
	padding: 16px;
	display: flex;
`;

const MyNavbar = () => {
	return (
		<StyledNav
			collapseOnSelect
			expand="lg"
			className="bg-primary"
			variant="dark"
		>
			<Link href="/">
				<a>
					<Navbar.Brand>Our Logo</Navbar.Brand>
				</a>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto mt-3 mt-lg-0">
					{menu.map((m) => (
						<Link href={`/${m.path}`}>
							<a className={`mx-0 my-2 mx-lg-3 my-lg-0`}>
								<HeadingSuperXXS
									className={`text-${
										m.path === "/mint" ? `lighterGreen` : `white`
									}`}
								>
									{m.text}
								</HeadingSuperXXS>
							</a>
						</Link>
					))}
				</Nav>
				<Nav className="mt-3 mt-lg-0">
					<Link href="/connect">
						<MyButton text="Connect Wallet" />
					</Link>
				</Nav>
			</Navbar.Collapse>
		</StyledNav>
	);
};

export default MyNavbar;
