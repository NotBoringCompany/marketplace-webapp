import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { HeadingSuperXXS } from "../Typography/Headings";
import { submenu } from "./submenu";

const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const MenuItemContainer = styled.div`
	display: flex;
	background: transparent;
	padding: 24px 16px;
	transition: all 300ms;
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
	return (
		<StyledContainer className="bg-primary2">
			{submenu.map((s) => (
				<Link href="/" id={s.url}>
					<a>
						<MenuItemContainer>
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
