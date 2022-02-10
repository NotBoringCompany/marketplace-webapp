import React from "react";
import styled from "styled-components";

import Link from "next/link";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import MyButton from "./Buttons/Button";
import { HeadingSuperXXS } from "./Typography/Headings";
import { menu } from "./Navbar/menu";
import { useRouter } from "next/router";

import Logo from "../public/logo.png";

const StyledNav = styled(Navbar)`
	width: 100%;
	padding: 16px;
	display: flex;
`;

const StyledLink = styled(HeadingSuperXXS)`
	color: ${(props) => (props.active ? `#CACACA !important` : `inherit`)};
`;

const MyNavbar = () => {
	const router = useRouter();
	return (
		<StyledNav
			collapseOnSelect
			expand="lg"
			className="bg-primary"
			variant="dark"
		>
			<Link href="/">
				<a>
					<Navbar.Brand>
						<Image src={Logo} alt="NBCompany" width={64} height={64} />
					</Navbar.Brand>
				</a>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto mt-3 mt-lg-0">
					{menu.map((m) => (
						<Link href={`/${m.path}`}>
							<a className={`mx-0 my-2 mx-lg-3 my-lg-0`}>
								<StyledLink
									active={m.path === router.pathname}
									className={`text-${
										m.path === "/mint" ? `lighterGreen` : `white`
									}`}
								>
									{m.text}
								</StyledLink>
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
