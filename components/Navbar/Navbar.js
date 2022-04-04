import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Link from "next/link";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import MyButton from "../Buttons/Button";
import Subnavbar from "./Subnavbar";
import { HeadingSuperXXS } from "../Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
// import { menu } from "./menu";
import { useRouter } from "next/router";

import Logo from "public/images/logo.png";
import InventoryLogo from "public/images/inventory.svg";
import { TextSecondary } from "components/Typography/Texts";

import MetamaskButton from "components/Buttons/MetamaskButton";

const StyledNav = styled(Navbar)`
	width: 100%;
	padding: 16px;
	display: flex;
	z-index: 1;
`;

const StyledLink = styled(HeadingSuperXXS)`
	font-size: 18px;
	font-weight: lighter;
	color: ${(props) => (props.active ? `#CACACA !important` : `inherit`)};
`;

const StyledLinkBold = styled(HeadingSuperXXS)`
	font-size: 18px;
	font-weight: bold;
	color: ${(props) => (props.active ? `#CACACA !important` : `inherit`)};
`;

const StyledDropdown = styled(Dropdown)`
	& .my-dropdown {
		padding-left: 0;
	}

	& .dropdown-menu {
		background: #2a2a2a !important;
		color: #fff;
	}

	& .content {
		padding: 0 16px;

		p {
			font-size: 14px;
		}
	}

	@media ${mediaBreakpoint.down.lg} {
		& .my-dropdown {
			padding-left: 0;
		}

		& .content {
			p {
				font-size: 16px;
			}
		}
	}
`;

const RightContent = () => {
	const { isAuthenticated, logout, user } = useMoralis();
	const router = useRouter();

	const handleLogOut = async () => {
		await logout();
		router.push("/connect");
	};

	const accountPageBtn = (
		<MyButton text="Log Out" pill onClick={handleLogOut} className="w-100" />
	);

	return (
		<Nav className="mt-3 mt-lg-0 ms-auto">
			{!isAuthenticated ? (
				// connectButton
				<div className="d-flex align-items-center flex-lg-row flex-column">
					<StyledLinkBold
						active={false}
						className={`text-white me-lg-4 mb-lg-0 mb-3`}
					>
						<a
							className="text-white"
							href="https://nbcompany.io/"
							target="_blank"
							rel="noopener noreferrer"
						>
							NBC
						</a>
					</StyledLinkBold>
					<StyledLink className={`text-white me-lg-4 mb-lg-0 mb-3`}>
						<a
							className="text-white"
							href="https://litepaper.nbcompany.io"
							target="_blank"
							rel="noopener noreferrer"
						>
							Litepaper
						</a>
					</StyledLink>
					<MetamaskButton />
				</div>
			) : (
				<div className="d-flex align-items-center flex-lg-row flex-column">
					<StyledLinkBold
						active={false}
						className={`text-white me-lg-4 mb-lg-0 mb-3`}
					>
						<a
							className="text-white"
							href="https://nbcompany.io/"
							target="_blank"
							rel="noopener noreferrer"
						>
							NBC
						</a>
					</StyledLinkBold>
					<StyledLink className={`text-white me-lg-4 mb-lg-0 mb-3`}>
						<a
							className="text-white"
							href="https://litepaper.nbcompany.io"
							target="_blank"
							rel="noopener noreferrer"
						>
							Litepaper
						</a>
					</StyledLink>
					<Link href={`/nbmons`}>
						<a className="text-white d-flex align-items-center mb-lg-0 mb-3">
							<Image
								src={InventoryLogo}
								alt="Inventory"
								width={18}
								height={18}
								className=""
							/>

							<StyledLink className={`text-white ms-2 me-lg-4`}>
								Inventory
							</StyledLink>
						</a>
					</Link>

					<div className="content">{accountPageBtn}</div>

					{/* <StyledDropdown>
						<Dropdown.Toggle
							className="my-dropdown border-none text-white "
							variant="transparent"
							id="dropdown-basic"
						>
							Account Details
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<div className="content pt-2">
								<TextSecondary>
									Wallet Address:{" "}
									{user.attributes &&
										user.attributes.ethAddress.split("").splice(0, 6).join("")}
									...
									{user.attributes.ethAddress.split("").splice(-5).join("")}
								</TextSecondary>
							</div>
							<hr />
							<div className="content">
								<TextSecondary>
									Connected Email:{" "}
									{user.attributes.email ? user.attributes.email : "-"}
								</TextSecondary>
							</div>
							<hr />
							<div className="content pb-2">{accountPageBtn}</div>
						</Dropdown.Menu>
					</StyledDropdown> */}
				</div>
			)}
		</Nav>
	);
};

const MyNavbar = ({ showSubnav }) => {
	// const router = useRouter();
	// const { isAuthenticated } = useMoralis();

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
							<Image src={Logo} alt="NBCompany" width={72} height={72} />
						</Navbar.Brand>
					</a>
				</Link>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					{/* {isAuthenticated && (
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
					)} */}

					<RightContent />
				</Navbar.Collapse>
			</StyledNav>
			{showSubnav && <Subnavbar />}
		</div>
	);
};

export default MyNavbar;
