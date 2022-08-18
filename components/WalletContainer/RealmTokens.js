import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

const RealmTokens = ({
	loading = false,
	recOwned = 0,
	resOwned = 0,
	xrecOwned = 0,
	xresOwned = 0,
	...props
}) => {
	const {
		setTokenContainer,
		showClaimContainer,
		setShowClaimContainer,
		showDepositContainer,
		setShowDepositContainer,
		// tokenName,
		setTokenName,
		statesSwitchModal,
		resAllowance,
		playfabId,
	} = props;

	return (
		<div className="mt-4">
			<div className="py-0 px-3 mb-2">
				<TitleWithLink title="Realm IP Tokens" />
			</div>
			<ListTokens className="mt-4">
				<Token className="me-3">
					<ActiveTokensWrap>
						<Image
							src="/images/lx.png"
							className="mt-1"
							width={38}
							height={40}
							alt="Image"
						/>
						<TextActive className="mt-1">
							{loading ? `...` : `${resOwned} RES`}
						</TextActive>

						<MyButton
							onClick={() => {
								statesSwitchModal.setter({
									content: "depositRES",
									availableAmount: resOwned,
									tokenName: "RES",
									resAllowance,
									show: true,
									statesSwitchModal,
									playfabId,
								});
							}}
							text="Deposit"
							pill
							thinText
							className="w-100 py-2 mt-1"
						/>
					</ActiveTokensWrap>
				</Token>
				<Token>
					<ActiveTokensWrap>
						<Image
							src="/images/lx.png"
							className="mt-1"
							width={38}
							height={40}
							alt="Image"
						/>
						<TextActive className="mt-1">
							{loading ? `...` : `${xresOwned} xRES`}
						</TextActive>
						<MyButton
							onClick={() => {
								setTokenContainer("Claim");
								setShowClaimContainer(!showClaimContainer);
								setShowDepositContainer(false);
								setTokenName("xRES");
							}}
							text="Claim"
							pill
							thinText
							className="w-100 py-2 mt-1"
						/>
					</ActiveTokensWrap>
				</Token>

				<Token></Token>
			</ListTokens>
		</div>
	);
};

const ListTokens = styled.ul`
	list-style: none;
	padding: 0 11px 11px 11px !important;
	display: flex;
	flex-flow: row wrap;
	align-items: stretch;
`;

const Token = styled.div`
	flex: 0 1 auto;
	padding: 0 4px 4px 4px;
	width: 25%;

	@media ${mediaBreakpoint.down.md} {
		width: 50%;
	}

	@media ${mediaBreakpoint.down.sm} {
		width: 100%;
	}
`;

const ActiveTokensWrap = styled.div`
	background: #2c2d2d;
	border-radius: 12px;
	padding: 16px;
	text-align: center;
`;

const TextActive = styled(TextSecondary)`
	font-weight: 500;
	font-size: 16px;
	line-height: 16px;
	letter-spacing: 0.5px;
	padding-bottom: 8px;
	color: #ffffff;
`;

export default RealmTokens;
