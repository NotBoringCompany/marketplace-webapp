import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { HeadingSuperXXS } from "../Typography/Headings";
import { submenu } from "./submenu";
import { useRouter } from "next/router";

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
	return (
		<StyledContainer className="bg-primary2">
			{submenu.map((s) => (
				<Link
					href={
						router.asPath.includes(s.path)
							? ""
							: `../${
									router.pathname.split("/").filter((p) => p.length > 0)[0]
							  }${s.path}`
					}
					id={s.path}
				>
					<a>
						<MenuItemContainer
							className={`${
								s.match.some((m) => router.asPath === m) && `active`
							}`}
						>
							<HeadingSuperXXS as="p" className="text-white">
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
