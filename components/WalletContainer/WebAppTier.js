import { React } from "react";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextSecondary, TextNormal } from "components/Typography/Texts";
import { StatsText } from "components/NBMonLargeCard/TabItemComponents";
import Link from "next/link";
import { HeadingSuperXXS } from "components/Typography/Headings";
import WebAppTierRequirements from "utils/blockchain-services/WebAppTiers/WebAppTierRequirements";

import InputGroup from "react-bootstrap/InputGroup";
import NextWebAppTierRequirements from "utils/blockchain-services/WebAppTiers/NextWebAppTierRequirements";

const WebAppTier = ({ loading = false, tier }) => {
	return (
		<div className="px-3 mt-5">
			<TitleWithLinkAlt title="Web App Tier" />
			<CardOverview className="mt-4">
				<ParTextLarger className="mt-3">
					Your current web app tier is:
				</ParTextLarger>

				{loading ? (
					`...`
				) : (
					<DepositFieldsText className="mt-3">{tier}</DepositFieldsText>
				)}
				<ParTextLarger className="mt-5">Current requirements:</ParTextLarger>
				<WebAppTierRequirements tier={tier} />
				<ParTextLarger className="mt-5">
					Requirements to level up to next tier:
				</ParTextLarger>
				<NextWebAppTierRequirements tier={tier} />
			</CardOverview>
		</div>
	);
};

const TitleWithLinkAlt = ({ title, textLink, href = "#" }) => {
	return (
		<Inner>
			<Title as="h2">{title}</Title>

			{textLink && (
				<LinkWrap className="ms-2">
					<Link href={href}>
						<a>
							<TextLink>{textLink}</TextLink>
						</a>
					</Link>
				</LinkWrap>
			)}
		</Inner>
	);
};

const CardOverview = styled.div`
	display: flex;
	flex-flow: column nowrap;
	background: #242424;
	border-radius: 12px;
	padding: 33px 40px;

	@media${mediaBreakpoint.down.md} {
		flex-flow: column nowrap;
		align-items: flex-start;
		padding: 25px 25px;
	}
`;

const DepositFieldsText = styled(TextNormal)`
	font-size: 22px;
	line-height: 20px;
	color: #e1e3e0;
`;

const Inner = styled.div`
	align-items: center;
	justifycontent: center;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-end;
`;

const Title = styled(HeadingSuperXXS)`
	flex: 0 1 auto;
	font-family: "Lexend";
	font-size: 32px;
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

const ParTextLarger = styled(TextNormal)`
	font-weight: 300;
	font-size: 22px;
	line-height: 28px;
	letter-spacing: 0.5px;
	color: #67dbb1;
`;

export default WebAppTier;
