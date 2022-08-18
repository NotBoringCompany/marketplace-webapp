import { useState } from "react";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import styled from "styled-components";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { TextSecondary, TextNormal } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/typography/Headings";
import MyButton from "components/Buttons/Button";

const DepositRES = ({ stateUtils }) => {
	const { getter } = stateUtils;

	const { availableAmount, tokenName, resAllowance } = getter;

	const resAllowanceInt = parseInt(resAllowance.hex, 16);

	const { user } = useMoralis();

	const [depositAmount, setDepositAmount] = useState(0);
	const [result, setResult] = useState("");

	const resAllowanceAmountTooLow = resAllowanceInt < depositAmount;
	const availableAmountTooLow = availableAmount < depositAmount;
	const depositAmountTooLow = depositAmount <= 0;

	const handleDeposit = async (e) => {
		e.preventDefault();
		try {
			let getPlayfabId = await fetch(
				`${
					process.env.NEXT_PUBLIC_NEW_REST_API_URL
				}/account/getPlayfabId/${user.attributes.ethAddress.toLowerCase()}`,
				{
					method: "GET",
				}
			);

			let playfabId = await getPlayfabId.json();

			let deposit = await fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/deposit${tokenName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						amount: depositAmount,
						playfabId: playfabId,
					}),
				}
			);

			let depositResponse = await deposit.json();

			if (deposit.status === 200) {
				setDepositAmount(0);
				setResult(
					`You have successfully deposited ${depositAmount} ${tokenName} for ${depositAmount} x${tokenName}`
				);
				// setTimeout(() => {
				// 	window.location.reload();
				// }, 2000);
			} else {
				setResult("An error has occured.");
			}
		} catch (err) {
			console.error("Error here", err.response.data);
		}
	};

	console.log({ resAllowance });

	return (
		<OuterContainer>
			<TitleWithLink title={"Deposit RES"} className="mb-3" />
			{resAllowanceAmountTooLow && (
				<div className="d-flex flex-column">
					<WarningContainer className="my-3">
						<p className="m-0 small text-black">
							WARNING: Your allowance to our wallet is too low for your deposit
							amount. Please increase your allowance before continuing.
						</p>
					</WarningContainer>

					<MyButton
						onClick={() => {}}
						thinText
						className="mt-0 mb-3 w-100 py-2"
						text="Increase Allowance"
						pill
					/>
					<hr />
				</div>
			)}

			<ParText className="mt-3">
				You are about to deposit {tokenName} in exchange for x{tokenName}.
			</ParText>

			<DepositFieldsText className="mt-4">Amount</DepositFieldsText>
			<AvailableText className="mt-1">
				Available {tokenName}: {availableAmount}
			</AvailableText>

			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					value={depositAmount}
					placeholder={`1`}
					onChange={(e) => setDepositAmount(e.target.value)}
				/>
				<InputGroup.Text id="basic-addon2">{tokenName}</InputGroup.Text>
			</StyledInputGroup>

			<p className="my-2 small text-center">in exchange for</p>

			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					value={depositAmount}
					placeholder={`1`}
					onChange={(e) => setDepositAmount(e.target.value)}
				/>
				<InputGroup.Text id="basic-addon2">x{tokenName}</InputGroup.Text>
			</StyledInputGroup>
			{availableAmountTooLow && (
				<WarningContainer className="my-3">
					<p className="m-0 small text-black">
						Oops, you don{`'`}t have enough amount of {tokenName} to be
						exchanged for x{tokenName}.
					</p>
				</WarningContainer>
			)}

			<MyButton
				onClick={handleDeposit}
				thinText
				disabled={
					resAllowanceAmountTooLow ||
					availableAmountTooLow ||
					depositAmountTooLow
				}
				className="mt-4 w-100 py-2"
				text="Deposit"
				pill
			/>
		</OuterContainer>
	);
};

const TitleWithLink = ({ title, textLink, href = "#", className = "" }) => {
	return (
		<Inner className={className}>
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
const WarningContainer = styled.div`
	padding: 16px;
	background: #ffcc00;
	border-radius: 10px;
`;
const OuterContainer = styled.div`
	padding: 36px 32px;
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
	alignitems: center;
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

const ParText = styled(TextNormal)`
	font-weight: 300;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: #67dbb1;
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

export default DepositRES;
