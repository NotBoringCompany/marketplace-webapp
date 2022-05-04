import React from "react";
import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { ButtonCopy } from "components/Buttons/ButtonCopy";
import { TextSecondary } from "components/Typography/Texts";
/**
 * Props:
 * @param string addressEth
 * @param number totalEth1
 * @param string totalEthUsd1
 * @returns JSX.Element
 */
const OverviewWallet = ({ addressEth, totalEth1, totalEthUsd1 }) => {
	return (
		<div className="px-3">
			<TitleWithLink title="Wallet" />
			<CardOverview className="mt-2">
				<AddressWrap>
					<ImageWrap>
						<Image
							alt="Eth Logo"
							src="/images/overview-eth-address.svg"
							width={28.04}
							height={44}
						/>
					</ImageWrap>

					<AddressContent>
						<AddressTitle className="mb-1">Ethereum Address</AddressTitle>

						<CopyAddress>
							<AddressText>{addressEth}</AddressText>

							<ButtonCopy
								onClick={() => navigator.clipboard.writeText(addressEth)}
							>
								<Image
									alt="Copy"
									src="/images/copy_all.svg"
									height={24}
									width={24}
								/>
							</ButtonCopy>
						</CopyAddress>
					</AddressContent>
				</AddressWrap>

				<ListCrypto>
					<CryptoItem>
						<CryptoIcon>
							<Image
								alt="Eth Logo"
								src="/images/Ethereum.svg"
								width={30}
								height={30}
							/>
						</CryptoIcon>

						<CryptoDetail>
							<TextTotalCrypto className="text-white">
								{totalEth1}
							</TextTotalCrypto>
							<TextUsd>{totalEthUsd1}</TextUsd>
						</CryptoDetail>
					</CryptoItem>
				</ListCrypto>
			</CardOverview>
		</div>
	);
};

const CardOverview = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	background: #242424;
	border-radius: 12px;
	padding: 33px 40px;

	@media${mediaBreakpoint.down.md} {
		flex-flow: column nowrap;
		align-items: flex-start;
		padding: 25px 25px;
	}
`;

const AddressWrap = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row nowrap;

	@media${mediaBreakpoint.down.md} {
		margin-bottom: 20px;
	}
`;

const ImageWrap = styled.div`
	flex: 0 1 auto;
	padding-right: 18px;
`;

const AddressTitle = styled.div`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 21px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #ffffff;
	margin-bottom: 0;
`;

const AddressContent = styled.div`
	flex: 0 1 auto;
`;

const CopyAddress = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-end;
`;

const AddressText = styled(TextSecondary)`
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.5px;
	color: #404944;
	max-width: 100%;
	width: 100%;
	overflow-x: hidden;
	margin-right: 4px;
	display: block;

	@media ${mediaBreakpoint.down.sm} {
		font-size: 11px;
	}
`;

const ListCrypto = styled.ul`
	list-style: none;
	margin: 0 !important;
	padding: 0 !important;
	display: flex;
	flex-flow: row nowrap;
`;

const CryptoItem = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	margin-right: 5px;
	align-items: center;
`;

const CryptoIcon = styled.div`
	flex: 0 1 auto;
`;

const CryptoDetail = styled.div`
	flex: 0 1 auto;
	padding-left: 4px;
`;

const TextTotalCrypto = styled.span`
	font-weight: 600;
	font-size: 18px;
	display: flex;
	align-items: center;
	text-align: center;
	display: block;
`;

const TextUsd = styled(TextSecondary)`
	font-weight: 600;
	font-size: 14px;
	display: flex;
	align-items: center;
	text-align: right;
	color: #afafaf;
	display: block;
	line-height: 12px;
`;

export default OverviewWallet;
