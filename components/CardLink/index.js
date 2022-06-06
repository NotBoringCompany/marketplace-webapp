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
`;

const StyledLink = styled.a`
	width: 100%;

	@media ${mediaBreakpoint.down.lg} {
		width: 240px;
	}
`;

const CardLink = ({ active = false, className = "", text = "", href = "" }) => {
	return (
		<Link href={href} passHref>
			<StyledLink className={`${className} mx-lg-0 mx-auto`}>
				<Card active={active ? 1 : 0}>
					<CardText className={`text-white ms-auto`}>{text}</CardText>
				</Card>
			</StyledLink>
		</Link>
	);
};

export default CardLink;
