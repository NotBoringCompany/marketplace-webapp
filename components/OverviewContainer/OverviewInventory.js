import React from "react";
import TitleWithLink from "components/Typography/TitleWithLink";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { TextSecondary } from "components/Typography/Texts";

const OverviewInventory = ({ loading = false, totalNBMons = 0 }) => {
	return (
		<div className="mt-4">
			<div className="py-0 px-3 mb-2">
				<TitleWithLink
					title="Inventory"
					textLink="Open inventory"
					href="/nbmons"
				/>
			</div>

			<ListInventory>
				{/* item */}
				<Item>
					<CardInventoryActive
						iconSrc="/images/lx.png"
						text={loading ? `...` : `${totalNBMons} NBMons`}
					/>
				</Item>
				<Item>
					<CardInventorySoon itemTitle="Artifacts" />
				</Item>
				<Item>
					<CardInventorySoon itemTitle="Land" />
				</Item>
				<Item>
					<CardInventorySoon itemTitle="Items" />
				</Item>
			</ListInventory>
		</div>
	);
};

/**
 * Props:
 * @param string iconSrc
 * @param string text
 * @returns JSX.Element
 */
const CardInventoryActive = ({ iconSrc, text }) => {
	return (
		<CardActiveWrap>
			<Image
				src={iconSrc}
				className="mt-1"
				width={38}
				height={40}
				alt="Image"
			/>

			<TextActive className="mt-1">{text}</TextActive>
		</CardActiveWrap>
	);
};

const CardInventorySoon = ({ itemTitle = "" }) => {
	return (
		<CardSoonWrap>
			<Image
				src="/images/question_mark.svg"
				className="mt-1"
				height={40}
				width={40}
				alt="QuestionMark"
			/>

			<TextItem>{itemTitle}</TextItem>

			<BlockComingSoon>
				<ComingSoonText className="text-center d-block w-100">
					coming soon
				</ComingSoonText>
			</BlockComingSoon>
		</CardSoonWrap>
	);
};

const ListInventory = styled.ul`
	list-style: none;
	padding: 0 11px 11px 11px !important;
	margin: 0 !important;
	display: flex;
	flex-flow: row wrap;
	align-items: stretch;
`;

const Item = styled.div`
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

const CardActiveWrap = styled.div`
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

const CardSoonWrap = styled.div`
	background: rgba(44, 45, 45, 0.78);
	opacity: 0.42;
	border-radius: 12px;
	padding: 16px 2.5px 2.5px 2.5px;
	text-align: center;
`;

const TextItem = styled(TextSecondary)`
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.5px;
	color: #ffffff;
`;

const BlockComingSoon = styled.div`
	background: #1c1c1c;
	border-radius: 26px;

	display: flex;
	letter-spacing: 0.1px;
	padding: 3px 8px;
	margin-top: 4px;
`;

const ComingSoonText = styled(TextSecondary)`
	color: #a2a2a2;
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 1;
`;

export default OverviewInventory;
