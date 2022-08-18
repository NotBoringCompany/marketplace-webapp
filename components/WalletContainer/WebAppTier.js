import {React} from "react";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextSecondary, TextNormal } from "components/Typography/Texts";
import { StatsText } from "components/NBMonLargeCard/TabItemComponents";
import Link from "next/link";
import { HeadingSuperXXS } from "components/typography/Headings";
import WebAppTierRequirements from "utils/blockchain-services/WebAppTiers/WebAppTierRequirements";

import InputGroup from "react-bootstrap/InputGroup";
import NextWebAppTierRequirements from "utils/blockchain-services/WebAppTiers/NextWebAppTierRequirements";

const WebAppTier = ({loading = false, tier}) => {
    return (
        <div className="px-3 mt-5">
            <TitleWithLinkAlt title="Web App Tier" />
            <CardOverview className="mt-4">
                <ParTextLarger className="mt-3">
					Your current web app tier is: 
					{loading ? `...` : 
					<DepositFieldsText className="mt-3">{tier}</DepositFieldsText>
					}
				</ParTextLarger>
				<ParTextLarger className="mt-5">Current requirements:</ParTextLarger>
				<WebAppTierRequirements tier={tier}/>
				<ParTextLarger className="mt-5">Requirements to level up to next tier:</ParTextLarger>
				<NextWebAppTierRequirements tier={tier}/>
            </CardOverview>
        </div>
    )
}

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

// const TierText = styled.div`
	// display: flex;
	// align-items: center;
	// flex-flow: column nowrap;
	// background: #242424;
// 	padding: -33px;

// 	@media${mediaBreakpoint.down.md} {
// 		flex-flow: column nowrap;
// 		align-items: flex-start;
// 		padding: 25px 25px;
// 	} 
// `;

const RequirementsList = styled.ol`

`; 

const DepositFieldsText = styled(TextNormal)`
	font-size: 22px;
	line-height: 20px;
	color: #e1e3e0;
`;

const AvailableText = styled(TextNormal)`
	font-size: 12px;
	line-height: 18px;
	color: #fff;

`;

const RequirementsText = styled(TextNormal)`
	font-size: 16px;
	line-height: 24px;
	color: #fff;

`;


const Inner = styled.div`
    align-items: center;
    justifyContent: center;
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

const ParText = styled(TextNormal)`
	font-weight: 300;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: #67dbb1;
`;

const ParTextLarger = styled(TextNormal)`
	font-weight: 300;
	font-size: 22px;
	line-height: 28px;
	letter-spacing: 0.5px;
	color: #67dbb1;
`;

const ParTextAlt = styled(TextNormal)`
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #ffffff;
`;

const ClaimContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 24px;

    @media ${mediaBreakpoint.down.lg} {
        padding: 0;
    }
`;

const ExampleText = styled(StatsText)`
	color: rgba(225, 227, 224, 0.23);
	& .me {
		font-size: 12px;
	}
`;

const StyledInputGroup = styled(InputGroup)`
	& input {
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		border: 1.5px solid #89938d;
		color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};
		border-radius: 8px;
		padding: 10px 16px;
		&:focus {
			background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
			color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
		}
	}

	& .input-group-text {
		border: 1.5px solid #89938d;
		border-left: none;
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		color: #fff;
	}
`;

const CardContainer = styled.div`
	padding: 16px;
	padding-bottom: 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	max-width: 80%;
	border-radius: 20px;
	margin-top: 160px;
	& .afterImage {
		position: relative;
		top: -102px;
	}
	margin-bottom: 24px;
	padding: 16px;

	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.14),
			rgba(255, 255, 255, 0.14)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;

	@media ${mediaBreakpoint.down.lg} {
		padding: 32px;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 16px;
		margin-bottom: 0;
		margin-top: 110px;
	}

	@media (max-width: 1024px) {
		border-radius: 20px;
	}
`;

export default WebAppTier;