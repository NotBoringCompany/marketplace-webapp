import React, { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import Image from "next/image";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { TextNormal } from "components/Typography/Texts";
import Egg from "components/../public/images/egg.svg";
import DisabledEgg from "components/../public/images/disabled_egg.svg";

const StyledButton = styled(Button)`
	padding: 16px;
	border-radius: 14px 14px 0 0;
	min-height: 120px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 300px;
	& .text-content {
		max-width: 240px;
	}
`;

const StyledTextNormal = styled(HeadingSuperXXS)`
	font-size: 16px;
	font-weight: 500;
`;

const MintButton = ({
	maxReached = false,
	alreadyMint = false,
	absoluteDisabled = false,
	onClick = () => {},
}) => {
	const { chainId } = useChain();
	const { isWeb3Enabled, user, enableWeb3 } = useMoralis();
	const [hide, setHide] = useState(false);
	useEffect(() => {
		if (!isWeb3Enabled) enableWeb3({ provider: "metamask" });
		if (
			(chainId && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) ||
			!chainId ||
			chainId === null ||
			chainId === undefined ||
			!isWeb3Enabled
		) {
			setHide(true);
		} else {
			setHide(false);
		}
		console.log("chainId", chainId);
		console.log(isWeb3Enabled);
		console.log("ASDASD");
	}, [chainId, user, isWeb3Enabled]);
	const disabled = maxReached || alreadyMint;

	if (hide) return <></>;

	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled || absoluteDisabled}
			variant="secondary"
		>
			{alreadyMint ? (
				<TextNormal className="text-secondary ms-auto">1/1</TextNormal>
			) : (
				<>
					{!maxReached && (
						<TextNormal className="text-white ms-auto">0/1</TextNormal>
					)}
				</>
			)}
			{!disabled ? (
				<>
					<Image width={25} height={32} src={Egg} alt="Egg" />
					<StyledTextNormal
						as="p"
						className="text-white mt-3 text-content text-center"
					>
						{absoluteDisabled
							? `Mint your Genesis NBMon Egg...`
							: `Mint your Genesis NBMon Egg`}
					</StyledTextNormal>
				</>
			) : (
				<>
					<Image width={25} height={32} src={DisabledEgg} alt="Egg" />
					{alreadyMint ? (
						<StyledTextNormal
							as="p"
							className="text-secondary mt-3 text-content text-center"
						>
							You successfully minted your <br />
							Genesis NBMon
						</StyledTextNormal>
					) : (
						<StyledTextNormal
							as="p"
							className="text-secondary mt-3 text-content text-center"
						>
							No more minting possible.
							<br />
							No Eggs Left!
						</StyledTextNormal>
					)}
				</>
			)}
		</StyledButton>
	);
};

export default MintButton;
