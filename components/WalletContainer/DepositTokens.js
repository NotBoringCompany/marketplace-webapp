import {useState, React} from "react";
import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { TextSecondary, TextPrimary, TextNormal } from "components/Typography/Texts";
import { StatsText } from "components/NBMonLargeCard/TabItemComponents";
import Link from "next/link";
import { HeadingSuperXXS } from "components/typography/Headings";

import InputGroup from "react-bootstrap/InputGroup";
import {FormControl, FormGroup} from "react-bootstrap/FormControl";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import axios from "axios";

const DepositTokens = ({
	tokenName, 
	availableAmount, 
}) => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();

	const [depositAmount, setDepositAmount] = useState(0);
	const [result, setResult] = useState('');

	const handleDeposit = async (e) => {
		e.preventDefault();
		try {
			let getPlayfabId = await fetch(`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/account/getPlayfabId/${(user.attributes.ethAddress).toLowerCase()}`, {
				method: "GET"
			});
			
			let playfabId = await getPlayfabId.json();

			console.log(playfabId);
			console.log(typeof playfabId);

			let deposit = await fetch(`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/deposit${tokenName}`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				  },
				body: JSON.stringify({
					amount: depositAmount,
					playfabId: playfabId
				}),
			});

			console.log(depositAmount);

			let depositResponse = await deposit.json();

			console.log(depositResponse);

			if (deposit.status === 200) {
				setDepositAmount(0);
				setResult(`You have successfully deposited ${depositAmount} ${tokenName} for ${depositAmount} x${tokenName}`);
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				setResult("An error has occured.");
			}
		} catch (err) {
			console.error("Error here", err.response.data);
		}
	}

    return (
        <div className="px-3 mt-5">
            <TitleWithLinkAlt title={"Deposit " + tokenName}/>
			<CardOverview className="mt-4">
				<ParText className="mt-3">You are about to deposit {tokenName} in exchange for x{tokenName}.</ParText>
				<AvailableText className="mt-4">Available: {availableAmount}</AvailableText>
				<DepositFieldsText className="mt-4">Amount</DepositFieldsText>
				<StyledInputGroup className="mt-4 mb-3">
					<form>
						<input 
							type="number"
							value={depositAmount}
							placeholder={`x${tokenName}`}
							onChange={(e) => setDepositAmount(e.target.value)}
						/>
						<button onClick={handleDeposit}>Deposit</button>
					</form>
				</StyledInputGroup>
			</CardOverview>
        </div>
    );
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

const Inner = styled.div`
    alignItems: center;
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

export default DepositTokens;
