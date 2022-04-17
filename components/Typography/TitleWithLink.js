import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "./Headings";
import { TextSecondary } from "./Texts";

/**
 * Props:
 * @param string title
 * @param string textLink - optional (will hide when prop empty)
 * @param string href - url of text link
 * @returns JSX.Element
 */
const TitleWithLink = ({ title, textLink, href = "#" }) => {
	return (
		<Inner>
			<Title as="h2">{title}</Title>

			{textLink && (
				<LinkWrap className="ms-2">
					<Link href={href}>
						<TextLink>{textLink}</TextLink>
					</Link>
				</LinkWrap>
			)}
		</Inner>
	);
};

const Inner = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-end;
`;

const Title = styled(HeadingSuperXXS)`
	flex: 0 1 auto;
	font-family: "Mada";
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
	color: #e1e3e0;
`;

const LinkWrap = styled.div`
	flex: 0 1 auto;
`;

const TextLink = styled(TextSecondary)`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: #67dbb1;
	cursor: pointer;
`;

export default TitleWithLink;
