import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { HeadingSuperXXS } from "../Typography/Headings";
import { submenu } from "./submenu";
import { useRouter } from "next/router";

import NBMonLogo from "../../public/images/nbmon_logo.png";
import ArtifactsLogo from "../../public/images/artifacts_logo.png";

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const MenuItemContainer = styled.div`
	display: flex;
	background: transparent;
	padding: 24px 16px;
	transition: background 200ms;
	&.active {
		background: #474747;
		border-bottom: 4px solid #48edb9;
	}

	&:hover {
		background: #474747;
		border-bottom: 4px solid #48edb9;
	}
`;

const Subnavbar = () => {
	const router = useRouter();
	console.log(router);
	console.log(router.asPath);

	const imageMapper = {
		nbmons: NBMonLogo,
		artifacts: ArtifactsLogo,
	};

	return (
		<StyledContainer className="bg-primary2">
			{submenu.map((s) => (
				<Link
					href={
						router.asPath.includes(s.path) ||
						router.asPath.asPath === "/account-page/nbmons" ||
						router.asPath.asPath === "/marketplace/nbmons"
							? "#"
							: `../${
									router.pathname.split("/").filter((p) => p.length > 0)[0]
							  }${s.path}`
					}
					id={s.id}
				>
					<a>
						<MenuItemContainer
							className={`${
								s.match.some((m) => router.asPath === m) && `active`
							} align-items-center`}
						>
							<Image
								src={imageMapper[s.id]}
								alt="Logo"
								width={35}
								height={26}
							/>
							<HeadingSuperXXS as="p" className="ms-2 text-white">
								{s.text}
							</HeadingSuperXXS>
						</MenuItemContainer>
					</a>
				</Link>
			))}
		</StyledContainer>
	);
};

export default Subnavbar;
