import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Link from "next/link";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import MyButton from "../Buttons/Button";
import Subnavbar from "./Subnavbar";
import { HeadingSuperXXS } from "../Typography/Headings";
import { menu } from "./menu";
import { useRouter } from "next/router";

import Logo from "../../public/images/logo.png";

const StyledNav = styled(Navbar)`
	width: 100%;
	padding: 16px;
	display: flex;
	z-index: 1;
`;

const StyledLink = styled(HeadingSuperXXS)`
	color: ${(props) => (props.active ? `#CACACA !important` : `inherit`)};
`;

const RightContent = () => {
	const { isAuthenticated, logout } = useMoralis();
	const router = useRouter();

	const handleLogOut = async () => {
		await logout();

		router.replace("/connect");
	};

	const connectButton = (
		<MyButton
			text="Connect Wallet"
			className="w-100"
			isLink
			img={"./images/metamask.svg"}
			href="/connect"
		/>
	);
	const logoutButton = (
		<MyButton text="Sign Out" className="w-100" onClick={handleLogOut} />
	);

	return (
		<Nav className="mt-3 mt-lg-0">
			{!isAuthenticated ? connectButton : logoutButton}
		</Nav>
	);
};

const MyNavbar = ({ showSubnav = false }) => {
	const router = useRouter();

	return (
		<div className="d-flex flex-column">
			<StyledNav
				collapseOnSelect
				expand="lg"
				className="bg-primaryComplement"
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
							<Link key={m.path} href={`${m.path}`}>
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
					<RightContent />
				</Navbar.Collapse>
			</StyledNav>
			{showSubnav && <Subnavbar />}
		</div>
	);
};

export default MyNavbar;
