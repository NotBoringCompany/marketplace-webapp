import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Link from "next/link";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import {
	OverviewSVG,
	InventorySVG,
	LogoutSVG,
	InventoryFilledSVG,
	OverviewFilledSVG,
	CalendarSVG,
} from "components/Navbar/SVGs";
import Subnavbar from "./Subnavbar";
import { mediaBreakpoint } from "utils/breakpoints";
import { useRouter } from "next/router";

import Logo from "public/images/logo.png";
import { FaCalendarDay } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";

import { TextNormal, TextSecondary } from "components/Typography/Texts";

import MetamaskButton from "components/Buttons/MetamaskButton";

const StyledNav = styled(Navbar)`
	width: 100%;
	padding: 0 32px;
	display: flex;
	z-index: 1;

	& .navbar-brand {
		width: 100%;
		margin: 0;
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	& .navbar-brand span {
		display: flex;
		align-items: center;
		margin: 0;
	}

	& .navbar-collapse {
		height: 78px;
	}

	@media ${mediaBreakpoint.down.lg} {
		& .navbar-collapse {
			height: revert;
		}

		& .collapsing {
			height: 0;
			overflow: hidden;
			transition: height 0.35s ease;
		}

		padding: 16px 24px;
	}
`;

const LeftMenuContainer = styled.div`
	display: flex;
	height: 100%;
	& svg {
		font-size: 24px;
	}

	& .calendar {
		font-size: 20px;
	}

	& a {
		transition: 0.2s all;
		color: rgba(225, 227, 224, 0.5);
		background: transparent;

		svg {
			transition: 0.2s all;
			fill: rgba(225, 227, 224, 0.5);
		}
	}

	& a.active {
		color: #42ca9f;
		background: #2f2f2f;

		svg {
			fill: #42ca9f;
		}
	}

	& a:hover {
		background: #2f2f2f;
		color: #e1e3e0;

		svg {
			fill: #e1e3e0;
		}
	}

	& a.disabled {
		color: rgba(225, 227, 224, 0.2);
		background: transparent;
		svg {
			fill: rgba(225, 227, 224, 0.2);
		}
	}

	& a.disabled:hover {
		cursor: not-allowed !important;
		svg {
			fill: rgba(225, 227, 224, 0.2);
		}
	}

	@media ${mediaBreakpoint.down.lg} {
		height: unset;

		& a.active {
			background: transparent;
		}
	}
`;
const StyledDropdown = styled(Dropdown)`
	& .my-dropdown {
		background: #2f2f2f;
		border-radius: 32px;
		padding: 6px 32px;
		transition: 0.35s all;
	}

	& .my-dropdown:hover {
		transform: translate(2px, -1px);
	}

	&.dropdown {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	& .dropdown-menu {
		background: #2a2a2a !important;
		color: #fff;
		min-width: 159px;
		border-radius: 16px;
		margin-top 10px;
	}

	& .content {
		padding: 0 16px;
		transition: 0.25s all;
		color: #e1e3e0;
		align-items: center;
		p {
			font-size: 14px;
		}

		svg {
			transition: 0.25s all;

			fill: #bfc9c2;
		}
	}

	& .content.active {
		color: #42ca9f;
		svg {
			fill: #42ca9f;
		}
	}

	& .content:hover {
		color: #42ca9f;

		svg {
			fill: #42ca9f;
		}
	}

	& .dropdown-toggle::after {
		margin-left: 0.455em;
		vertical-align: 2px;
	}

	& hr {
		padding: 0 16px;
		margin: 0;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		color: #E0E3E0;
	}

	@media ${mediaBreakpoint.down.lg} {
		& .content {
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

	return (
		<Nav className="mt-3 mt-lg-0 ms-auto">
			{!isAuthenticated ? (
				// connectButton
				<div className="d-flex align-items-center flex-lg-row flex-column">
					<MetamaskButton />
				</div>
			) : (
				<div className="d-flex align-items-center flex-lg-row flex-column">
					<StyledDropdown>
						<Dropdown.Toggle
							className="my-dropdown border-none text-white"
							variant="transparent"
							id="dropdown-basic"
						>
							My Account
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Link href="/overview">
								<a
									className={`mt-2 content d-flex ${
										router.pathname === "/overview" && `active`
									}`}
								>
									{router.pathname === "/overview" ? (
										<OverviewFilledSVG />
									) : (
										<OverviewSVG />
									)}
									<TextSecondary className="ms-3">Overview</TextSecondary>
								</a>
							</Link>

							<Link href="/nbmons">
								<a
									className={`my-3 content  d-flex ${
										router.pathname === "/nbmons" && `active`
									}`}
								>
									{router.pathname === "/nbmons" ? (
										<InventoryFilledSVG />
									) : (
										<InventorySVG />
									)}
									<TextSecondary className="ms-3">Inventory</TextSecondary>
								</a>
							</Link>

							<hr />

							<Link href="#">
								<a onClick={handleLogOut} className="mt-3 mb-2 content d-flex">
									<LogoutSVG />
									<TextSecondary className="ms-3">Log-out</TextSecondary>
								</a>
							</Link>

							{/* <div className="content pb-2">{accountPageBtn}</div> */}
						</Dropdown.Menu>
					</StyledDropdown>
				</div>
			)}
		</Nav>
	);
};

const MyNavbar = ({ showSubnav }) => {
	// const { isAuthenticated } = useMoralis();
	const router = useRouter();

	return (
		<div className="d-flex flex-column position-relative" style={{ zIndex: 3 }}>
			<StyledNav
				collapseOnSelect
				expand="lg"
				className="bg-primaryComplement"
				variant="dark"
			>
				<Link href="/">
					<a>
						<Navbar.Brand>
							<Image src={Logo} alt="NBCompany" width={48} height={48} />
						</Navbar.Brand>
					</a>
				</Link>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<LeftMenuContainer className="d-flex flex-lg-row flex-column">
						<a className="disabled ms-lg-4 mx-auto px-3 align-items-center justify-content-center d-flex mb-lg-0 mb-3">
							<MdStorefront className="me-2" />
							<TextNormal className="mt-1">Marketplace</TextNormal>
						</a>
						<Link href="/">
							<a
								className={`mx-auto px-3 align-items-center justify-content-center d-flex ${
									router.pathname === "/" && `active`
								}`}
							>
								<CalendarSVG />
								<TextNormal className="ms-2 mt-1">Minting Event</TextNormal>
							</a>
						</Link>
					</LeftMenuContainer>

					<RightContent />
				</Navbar.Collapse>
			</StyledNav>
			{showSubnav && <Subnavbar />}
		</div>
	);
};

export default MyNavbar;
