import React, { useState, useEffect, useContext } from "react";
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
import { TextSecondary } from "components/Typography/Texts";

import AppContext from "context/AppContext";

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
		padding-left: 90px;
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
	const {
		isAuthenticated,
		logout,
		user,
		isWeb3Enabled,
		chainId,
		hasAuthError,
		authError,
		authenticate,
		isAuthenticating,
	} = useMoralis();
	const router = useRouter();
	const [triedAuth, setTriedAuth] = useState(false);
	const [showModalNoMM, setShowModalNoMM] = useState(false);
	const { setShowWrongNetworkModal, showWrongNetworkModal } =
		useContext(AppContext);

	useEffect(() => {
		if (hasAuthError) {
			// console.log("Error:", authError.message);

			//TODO, refactor the below...
			if (triedAuth && authError.message === "Non ethereum enabled browser") {
				setShowModalNoMM(true);
				return;
			}

			/*	alert(
					"Sorry, an unexpected error occured. Please try again, preferably with a different browser."
				);*/
		}
	}, [hasAuthError, triedAuth]);

	useEffect(() => {
		async function auth() {
			await authenticate({ provider: "metamask" });
		}
		if (chainId === process.env.NEXT_PUBLIC_CHAIN_ID && triedAuth) {
			auth();
			setTriedAuth(false);
		}
	}, [chainId, triedAuth]);

	const authCrypto = async () => {
		setTriedAuth(true);
		if (isWeb3Enabled && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
			setShowWrongNetworkModal(true);
	};

	const connectButton = (
		<MyButton
			className="w-10 mb-lg-0 mb-3"
			pill
			onClick={authCrypto}
			disabled={isAuthenticating}
			img={"./images/metamask.svg"}
			text={!isAuthenticating ? "Login with Metamask" : "Connecting..."}
		/>
	);
	const accountPageBtn = (
		<MyButton text="Sign Out" onClick={logout} className="w-100" />
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
					{connectButton}
				</div>
			) : (
				<StyledDropdown>
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
							<TextSecondary></TextSecondary>
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
				</StyledDropdown>
			)}
		</Nav>
	);
};

const MyNavbar = ({ showSubnav }) => {
	const router = useRouter();
	const { isAuthenticated } = useMoralis();

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
