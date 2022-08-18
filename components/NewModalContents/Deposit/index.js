import { useState } from "react";
import Web3 from "web3";
import { useMutation } from "react-query";
import { useWeb3Contract } from "react-moralis";
import Link from "next/link";
import styled from "styled-components";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { TextSecondary, TextNormal } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import MyButton from "components/Buttons/Button";
import ModalButton from "components/Buttons/ModalButton";
import RealmShardsABI from "abis/RealmShards.json";

const DepositRES = ({ stateUtils }) => {
	console.log({ RealmShardsABI });

	const { getter } = stateUtils;

	const {
		availableAmount,
		tokenName,
		resAllowance,
		statesSwitchModal,
		playfabId,
	} = getter;

	const resAllowanceInt = parseInt(resAllowance.hex, 16);

	const [depositAmount, setDepositAmount] = useState(0);
	const [success, setSuccess] = useState(false);

	const resAllowanceAmountTooLow = resAllowanceInt < depositAmount;
	const availableAmountTooLow = availableAmount < depositAmount;
	const depositAmountTooLow = depositAmount <= 0;

	const increaseAllowance = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_REALM_SHARDS_CONTRACT,
		functionName: "increaseAllowance",
		abi: RealmShardsABI,

		params: {
			spender: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
			addedValue:
				depositAmount > 0
					? Web3.utils.toWei(depositAmount.toString(), "ether")
					: Web3.utils.toWei("100", "ether"),
		},
	});

	const handleIncreaseAllowance = async () => {
		try {
			const increasedAllowance = await increaseAllowance.runContractFunction({
				throwOnError: true,
			});

			console.log({ increasedAllowance });

			const awaited = await increasedAllowance.wait();

			console.log({ awaited });
		} catch (e) {
			console.log({ e });
		}
	};

	const depositMutation = useMutation(
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/deposit${tokenName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						amount: depositAmount,
						playfabId,
					}),
				}
			),
		{
			onSuccess: async (response) => {
				//Showing success message
				const res = await response.json();
				if (response.ok) {
					setSuccess(true);
					setTimeout(() => {
						window.location.reload();
					}, 5000);
				} else {
					//Due to using `fetch`, the error still falls within onSuccess.
					//To "fix" this behaviour, use axios.
					console.log(`Depositing ${tokenName} Error:`, res);
					statesSwitchModal.setter({
						show: true,
						content: "txError",
						detail: {
							title: "Depositing Error",
							text: "We are sorry, an unexpected \n error occured. \n \n Please contact us to let us \n know the details.",
						},
					});
				}
			},
			retry: 0,
		}
	);

	const depositDisabled =
		resAllowanceAmountTooLow ||
		availableAmountTooLow ||
		depositAmountTooLow ||
		depositMutation.isLoading ||
		!playfabId;

	const handleDeposit = () => {
		if (!depositDisabled) depositMutation.mutate();
	};

	return (
		<OuterContainer>
			<TitleWithLink title={"Deposit RES"} className="mb-3" />

			{!success ? (
				<MainContent
					resAllowanceAmountTooLow={resAllowanceAmountTooLow}
					availableAmountTooLow={availableAmountTooLow}
					tokenName={tokenName}
					availableAmount={availableAmount}
					depositAmount={depositAmount}
					onDepositAmountChanged={setDepositAmount}
					handleDeposit={handleDeposit}
					playfabId={playfabId}
					depositMutationLoading={depositMutation.isLoading}
					depositDisabled={depositDisabled}
					handleIncreaseAllowance={handleIncreaseAllowance}
				/>
			) : (
				<SuccessMessage depositAmount={depositAmount} tokenName={tokenName} />
			)}
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

const MainContent = ({
	resAllowanceAmountTooLow,
	availableAmountTooLow,
	tokenName,
	availableAmount,
	depositAmount,
	onDepositAmountChanged,
	handleDeposit,
	playfabId,
	handleIncreaseAllowance,
	depositMutationLoading = false,
	depositDisabled = false,
}) => {
	return (
		<>
			{resAllowanceAmountTooLow && (
				<div className="d-flex flex-column">
					<WarningContainer className="my-3">
						<p className="m-0 small text-black">
							WARNING: Your allowance to our wallet is too low for your deposit
							amount. Please increase your allowance before continuing.
						</p>
					</WarningContainer>

					<MyButton
						onClick={handleIncreaseAllowance}
						thinText
						className="mt-0 mb-3 w-100 py-2"
						text="Increase Allowance"
						pill
					/>
					<hr />
				</div>
			)}

			{!playfabId && (
				<div className="d-flex flex-column">
					<WarningContainer className="my-3">
						<p className="m-0 small text-black">
							This account is currently not connected to any game account.
							<br />
							<br />
							Please create an account in the game (Realm Hunter) to be able to
							deposit.
						</p>
					</WarningContainer>
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
					readOnly={!playfabId}
					value={depositAmount}
					placeholder={`1`}
					onChange={(e) => onDepositAmountChanged(e.target.value)}
				/>
				<InputGroup.Text id="basic-addon2">{tokenName}</InputGroup.Text>
			</StyledInputGroup>

			<p className="my-2 small text-center">in exchange for</p>

			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					value={depositAmount}
					readOnly={!playfabId}
					placeholder={`1`}
					onChange={(e) => onDepositAmountChanged(e.target.value)}
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
				disabled={depositDisabled}
				className="mt-4 w-100 py-2"
				text={depositMutationLoading ? `Processing...` : `Deposit`}
				pill
			/>
		</>
	);
};

const SuccessMessage = ({ depositAmount, tokenName }) => {
	return (
		<div className="d-flex flex-column">
			<p className="mt-4 fw-light small">
				<b>Congratulations!</b> You have successfully deposited{" "}
				<span className="text-secondary">
					{depositAmount} {tokenName} for {depositAmount} x{tokenName}{" "}
				</span>
				.<br />
				<br /> This page will automatically reload in a moment...
			</p>
			<ModalButton
				onClick={() => {
					window && window.location.reload();
				}}
			>
				OK
			</ModalButton>
		</div>
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

	& input.form-control:disabled,
	& input.form-control[readonly] {
		background: #393939;
	}

	& .input-group-text {
		border: 1.5px solid #89938d;
		border-left: none;
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		color: #fff;
	}
`;

export default DepositRES;
