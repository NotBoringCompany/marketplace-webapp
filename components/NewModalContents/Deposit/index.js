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
import MyButton from "components/Buttons/Button";
import ModalButton from "components/Buttons/ModalButton";
import RealmShardsABI from "abis/RealmShards.json";
import reload from "utils/reload";

const Deposit = ({ stateUtils }) => {
	const { getter } = stateUtils;

	const {
		availableAmount,
		tokenName,
		resAllowance,
		statesSwitchModal,
		playfabId,
	} = getter;

	const resAllowanceInt = parseFloat(resAllowance);

	console.log({ resAllowanceInt: parseFloat(resAllowance) });

	const [depositAmount, setDepositAmount] = useState(1);
	const { user, Moralis } = useMoralis();
	const [success, setSuccess] = useState(false);

	const [gasFeeTrxLoading, setGasFeeTrxLoading] = useState(false);

	const resAllowanceAmountTooLow = resAllowanceInt < depositAmount;
	const availableAmountTooLow = availableAmount < depositAmount;
	const depositAmountTooLow = depositAmount <= 0;

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
				depositAmount > 0
					? Web3.utils.toWei(depositAmount.toString(), "ether")
					: Web3.utils.toWei("100", "ether"), //safeguard -> just in-case
		},
	});

	const handleCloseModal = () => {
		statesSwitchModal.setter({
			...getter,
			show: false,
		});
	};

	const handleIncreaseAllowance = async () => {
		try {
			statesSwitchModal.setter({
				show: true,
				content: "metamaskConfirmation",
			});

			const increasedAllowance = await increaseAllowance.runContractFunction({
				throwOnError: true,
			});

			statesSwitchModal.setter({
				show: true,
				content: "increaseAllowanceLoading",
			});

			await increasedAllowance.wait();

			statesSwitchModal.setter({
				show: true,
				content: "increaseAllowanceSuccess",
			});

			reload();
		} catch (e) {
			statesSwitchModal.setter({
				content: "txError",
				show: false,
			});
			if (e.code === "INSUFFICIENT_FUNDS") {
				statesSwitchModal.setter({
					show: true,
					content: "txError",
					detail: {
						title: "Transaction Error",
						text: `You have insufficient funds to \n make this transaction`,
					},
				});
				// code 4001 is user cancellation
			} else if (!e.code || (e.code && e.code !== 4001)) {
				console.log({ e });
				statesSwitchModal.setter({
					show: true,
					content: "txError",
					detail: {
						title: "Increase Allowance Error",
						text: "We are sorry, an unexpected \n error occured. \n \n Please contact us to let us \n know the details.",
					},
				});
			}
		}
	};

	const depositMutation = useMutation(
		(data) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/deposit${tokenName}`,
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

	const depositDisabled =
		resAllowanceAmountTooLow ||
		availableAmountTooLow ||
		depositAmountTooLow ||
		depositMutation.isLoading ||
		gasFeeTrxLoading ||
		!playfabId;

	const handleDeposit = async () => {
		if (!depositDisabled) {
			setGasFeeTrxLoading(true);
			await trfDepositGasFee.fetch({
				onSuccess: async (tx) => {
					const txRes = await tx.wait();
					depositMutation.mutate({
						amount: depositAmount,
						playfabId,
						purchaserAddress: user.attributes.ethAddress,
						txHash: txRes.transactionHash,
					});
					setGasFeeTrxLoading(false);
				},
				onError: (e) => {
					statesSwitchModal.setter({
						content: "txError",
						show: false,
					});
					if (e.code === "INSUFFICIENT_FUNDS") {
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: `You have insufficient funds to \n make this transaction`,
							},
						});
						// code 4001 is user cancellation
					} else if (!e.code || (e.code && e.code !== 4001)) {
						console.log({ e });
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Gas Fee Transaction Error",
								text: "We are sorry, an unexpected \n error occured. \n \n Please contact us to let us \n know the details.",
							},
						});
					}
					setGasFeeTrxLoading(false);
				},
			});
		}
	};

	return (
		<OuterContainer>
			<TitleWithLink title={"Deposit RES"} className="mb-2" />

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
					handleIncreaseAllowance={handleIncreaseAllowance}
					depositMutationLoading={depositMutation.isLoading}
					trfDepositGasFeeLoading={gasFeeTrxLoading}
					depositDisabled={depositDisabled}
					handleCloseModal={handleCloseModal}
				/>
			) : (
				<SuccessMessage depositAmount={depositAmount} tokenName={tokenName} />
			)}
		</OuterContainer>
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
	trfDepositGasFeeLoading = false,
	depositMutationLoading = false,
	depositDisabled = false,
	handleCloseModal,
}) => {
	const isLoading = trfDepositGasFeeLoading || depositMutationLoading;
	let buttonText = isLoading
		? `${
				trfDepositGasFeeLoading
					? `Transferring gas fee...`
					: `Processing deposit...`
		  }`
		: `Deposit`;
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

			<ParText className="mt-1">
				You are about to deposit {tokenName} in exchange for x{tokenName}.
			</ParText>

			<DepositFieldsText className="mt-4">Deposit Amount</DepositFieldsText>
			<AvailableText className="mt-1">
				Available {tokenName}: {availableAmount}
			</AvailableText>

			<StyledInputGroup className="my-3">
				<FormControl
					type="number"
					readOnly={!playfabId || isLoading}
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
					readOnly={!playfabId || isLoading}
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

			<div className="d-flex flex-column">
				<MyButton
					onClick={handleDeposit}
					thinText
					disabled={depositDisabled}
					className="mt-4 w-100 py-2"
					text={buttonText}
					pill
				/>

				{!isLoading && (
					<ModalButton className="mx-auto mt-3" onClick={handleCloseModal}>
						Cancel
					</ModalButton>
				)}
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
					reload();
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

export default Deposit;
