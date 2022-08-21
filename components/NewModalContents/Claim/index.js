import { useState } from "react";
import Web3 from "web3";
import { useMutation } from "react-query";
import { useWeb3Contract, useWeb3Transfer, useMoralis } from "react-moralis";
import Link from "next/link";
import styled from "styled-components";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {
	TextSecondary,
	TextNormal,
	TextPrimary,
} from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import MyButton from "components/Buttons/Button";
import ModalButton from "components/Buttons/ModalButton";
import RealmShardsABI from "abis/RealmShards.json";

const reload = () =>
	setTimeout(() => {
		window.location.reload();
	}, 5000);

const Claim = ({ stateUtils }) => {
	const { getter } = stateUtils;

	const {
		availableAmount,
		tokenName,
		resAllowance,
		statesSwitchModal,
		playfabId,
		minimumTokenClaim,
		maximumTokenClaim,
		claimFee,
		claimCooldown,
	} = getter;

	const resAllowanceInt = parseFloat(resAllowance);

	const claimLimits = { minimumTokenClaim, maximumTokenClaim };

	const claimData = { claimCooldown, claimFee, claimLimits };
	const [claimAmount, setClaimAmount] = useState(minimumTokenClaim);
	const { user, Moralis } = useMoralis();
	const [success, setSuccess] = useState(false);

	const [gasFeeTrxLoading, setGasFeeTrxLoading] = useState(false);

	const calculatedValue = claimAmount - (claimFee / 100) * claimAmount;

	const trfDepositGasFee = useWeb3Transfer({
		amount: Moralis.Units.ETH(process.env.NEXT_PUBLIC_RES_GAS_FEE),
		receiver: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
		type: "native",
	});

	const increaseAllowance = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_REALM_SHARDS_CONTRACT,
		functionName: "increaseAllowance",
		abi: RealmShardsABI,

		params: {
			spender: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
			addedValue:
				claimAmount > 0
					? Web3.utils.toWei(claimAmount.toString(), "ether")
					: Web3.utils.toWei("100", "ether"), //safeguard -> just in-case
		},
	});

	const handleCloseModal = () => {
		statesSwitchModal.setter({
			...getter,
			show: false,
		});
	};

	const claimMutation = useMutation(
		(data) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/claim${tokenName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			),
		{
			onSuccess: async (response) => {
				//Showing success message
				const res = await response.json();
				if (response.ok) {
					setSuccess(true);
					reload();
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

	const claimDisabled =
		claimAmount > availableAmount ||
		claimAmount < minimumTokenClaim ||
		claimAmount > maximumTokenClaim ||
		claimMutation.isLoading ||
		claimCooldown > 0 ||
		!playfabId;

	const handleClaim = async () => {
		if (!claimDisabled) {
			// setGasFeeTrxLoading(true);

			claimMutation.mutate({
				amount: claimAmount,
				playfabId,
				purchaserAddress: user.attributes.ethAddress,
				txHash: "lalallaa",
			});

			// await trfDepositGasFee.fetch({
			// 	onSuccess: async (tx) => {
			// 		const txRes = await tx.wait();
			// 		claimMutation.mutate({
			// 			amount: claimAmount,
			// 			playfabId,
			// 			purchaserAddress: user.attributes.ethAddress,
			// 			txHash: "lalallaa",
			// 		});
			// 		setGasFeeTrxLoading(false);
			// 	},
			// 	onError: (e) => {
			// 		statesSwitchModal.setter({
			// 			content: "txError",
			// 			show: false,
			// 		});
			// 		if (e.code === "INSUFFICIENT_FUNDS") {
			// 			statesSwitchModal.setter({
			// 				show: true,
			// 				content: "txError",
			// 				detail: {
			// 					title: "Transaction Error",
			// 					text: `You have insufficient funds to \n make this transaction`,
			// 				},
			// 			});
			// 			// code 4001 is user cancellation
			// 		} else if (!e.code || (e.code && e.code !== 4001)) {
			// 			console.log({ e });
			// 			statesSwitchModal.setter({
			// 				show: true,
			// 				content: "txError",
			// 				detail: {
			// 					title: "Deposit Gas Fee Error",
			// 					text: "We are sorry, an unexpected \n error occured. \n \n Please contact us to let us \n know the details.",
			// 				},
			// 			});
			// 		}
			// 		setGasFeeTrxLoading(false);
			// 	},
			// });
		}
	};

	return (
		<OuterContainer>
			<TitleWithLink title={`Claim xRES`} className="mb-2" />

			{!success ? (
				<MainContent
					tokenName={tokenName}
					availableAmount={availableAmount}
					claimAmount={claimAmount}
					onclaimAmountChanged={setClaimAmount}
					handleClaim={handleClaim}
					playfabId={playfabId}
					claimMutationLoading={claimMutation.isLoading}
					trfDepositGasFeeLoading={gasFeeTrxLoading}
					claimDisabled={claimDisabled}
					handleCloseModal={handleCloseModal}
					claimData={claimData}
					calculatedValue={calculatedValue}
				/>
			) : (
				<SuccessMessage
					claimAmount={claimAmount}
					calculatedValue={calculatedValue}
					tokenName={tokenName}
				/>
			)}
		</OuterContainer>
	);
};

const MainContent = ({
	tokenName,
	availableAmount,
	claimAmount,
	onclaimAmountChanged,
	handleClaim,
	playfabId,
	trfDepositGasFeeLoading = false,
	claimMutationLoading = false,
	claimDisabled = false,
	handleCloseModal,
	claimData,
	calculatedValue = 0,
}) => {
	const isLoading = trfDepositGasFeeLoading || claimMutationLoading;
	const { claimLimits, claimFee, claimCooldown } = claimData;
	const { minimumTokenClaim, maximumTokenClaim } = claimLimits;

	const outsideLimit =
		claimAmount < minimumTokenClaim || claimAmount > maximumTokenClaim;

	let buttonText = isLoading
		? `${trfDepositGasFeeLoading ? `Transferring gas fee...` : `Claiming...`}`
		: `Claim`;
	return (
		<>
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
			<ParText className="mt-1">
				You are about to claim {tokenName} in exchange for {tokenName.slice(1)}.
			</ParText>
			<DepositFieldsText className="mt-4">Amount</DepositFieldsText>
			<AvailableText className="mt-1">
				Available {tokenName}: {availableAmount}
			</AvailableText>
			<AvailableText className="mt-1">
				Minimum {tokenName} claim: {claimLimits.minimumTokenClaim}
			</AvailableText>
			<AvailableText className="mt-1">
				Maximum {tokenName} claim: {claimLimits.maximumTokenClaim}
			</AvailableText>
			<AvailableText className="mt-1">Claim fee: {claimFee}%</AvailableText>
			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					readOnly={!playfabId}
					value={claimAmount}
					placeholder={claimLimits.minimumTokenClaim}
					onChange={(e) => onclaimAmountChanged(e.target.value)}
				/>
				<InputGroup.Text id="basic-addon2">{tokenName}</InputGroup.Text>
			</StyledInputGroup>
			<p className="my-2 small text-center">in exchange for</p>
			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					value={calculatedValue}
					readOnly
					placeholder={claimLimits.minimumTokenClaim}
				/>
				<InputGroup.Text id="basic-addon2">
					{tokenName.slice(1)}
				</InputGroup.Text>
			</StyledInputGroup>
			{claimCooldown > 0 && (
				<WarningContainer className="my-3">
					<p className="m-0 small text-black">
						You can{"'"}t claim now. Try again in {claimCooldown}
					</p>
				</WarningContainer>
			)}
			{outsideLimit && (
				<WarningContainer className="my-3">
					<p className="m-0 small text-black">
						Your claim value is not within the specified limits. Make sure you
						are claiming between {minimumTokenClaim} and {maximumTokenClaim}{" "}
						{tokenName}.
					</p>
				</WarningContainer>
			)}

			<div className="d-flex flex-column">
				<MyButton
					onClick={handleClaim}
					thinText
					disabled={claimDisabled}
					className="mt-4 w-100 py-2"
					text={buttonText}
					pill
				/>

				<ModalButton className="mx-auto mt-3" onClick={handleCloseModal}>
					Cancel
				</ModalButton>
			</div>
		</>
	);
};

const TitleWithLink = ({ title, textLink, href = "#", className = "" }) => {
	return (
		<Inner className={className}>
			<TextPrimary as="h2">{title}</TextPrimary>
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

const SuccessMessage = ({ claimAmount, calculatedValue, tokenName }) => {
	return (
		<div className="d-flex flex-column">
			<p className="mt-4 fw-light small">
				<b>Congratulations!</b> You have successfully claimed{" "}
				<span className="text-secondary">
					{claimAmount} {tokenName} for {calculatedValue} {tokenName.slice(1)}{" "}
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

export default Claim;
