import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { TextPrimary } from "components/Typography/Texts";
import { mediaBreakpoint } from "utils/breakpoints";

const Card = styled.div`
	background: ${(props) =>
		props.active
			? `#323333`
			: `linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0.12)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000`};
	padding: 34px 24px;
	border-radius: 12px;
	width: 100%;
	display: flex;

	@media ${mediaBreakpoint.down.lg} {
		width: 240px;
	}
`;

const CardText = styled(TextPrimary)`
	font-family: "Lexend";
	font-style: normal;
	font-weight: 400;
	font-size: 22px;
	line-height: 28px;
	color: ${(props) => (props.active ? `#f0f0f0` : `rgba(255, 255, 255, 0.44)`)};
`;

const StyledLink = styled.a`
	width: 100%;

	@media ${mediaBreakpoint.down.lg} {
		width: 240px;
	}

	&:hover {
		cursor: ${(props) => (props.active ? `auto` : `not-allowed`)};
	}
`;

const CardLink = ({ active = false, className = "", text = "", href = "" }) => {
	return (
		<Link href={active ? href : `#`} passHref>
			<StyledLink
				active={active ? 1 : 0}
				className={`${className} mx-lg-0 mx-auto`}
			>
				<Card active={active ? 1 : 0}>
					<CardText active={active ? 1 : 0} className={`ms-auto`}>
						{text}
					</CardText>
				</Card>
			</StyledLink>
		</Link>
	);
};

export default CardLink;
