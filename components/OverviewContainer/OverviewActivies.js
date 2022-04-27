import React from "react";
import styled from "styled-components";

import TitleWithLink from "components/Typography/TitleWithLink";
import { TextNormal } from "components/Typography/Texts";

const StyledText = styled(TextNormal)`
	font-size: 14px;
	font-weight: 300;
`;

const OverviewActivies = ({ activities }) => {
	const activityText = (transactionType, price) => {
		switch (transactionType) {
			case "genesisMinting":
				return `You bought and minted an egg for ${price} ETH`;
			case "genesisHatching":
				return `You hatched your egg!`;
			default:
				return `You made an activity`;
		}
	};

	return (
		<div className="py-0 px-3 mt-2 mb-3">
			<TitleWithLink title="Activities" />
			<StyledText className="text-white mt-1">
				All dates and times are in UTC
			</StyledText>
			{[...activities]
				.sort((a, b) => new Date(b.dateGroup) - new Date(a.dateGroup))
				.map((activity) => (
					<>
						<TitleDate className="mt-3">{activity.dateGroup}</TitleDate>

						<ListActivites>
							{[...activity.data]
								.sort(
									(a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
								)
								.map((d) => (
									<CardItemActivities
										time={d.utcTime}
										title={activityText(d.transaction_type, d.value)}
										description="Transaction status (Block Explorer)"
										href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/${d.transaction_hash}`}
									/>
								))}
						</ListActivites>
					</>
				))}
		</div>
	);
};

/**
 * Props:
 * @param string time
 * @param string title
 * @param string description
 * @param string href
 * @returns JSX.Element
 */
const CardItemActivities = ({ time, title, description, href = "#" }) => {
	return (
		<ItemActivies>
			<TimeWrap>
				<TextTime>{time}</TextTime>
			</TimeWrap>

			<DetailWrap>
				<TitleDetail>{title}</TitleDetail>
				<DetailLinkWrap>
					<a href={href} target="_blank" rel="noopener noreferrer">
						<TextLink>{description}</TextLink>
						<ImgIcon src="/images/goto_icon.svg" />
					</a>
				</DetailLinkWrap>
			</DetailWrap>
		</ItemActivies>
	);
};

const TitleDate = styled.h5`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.1px;
	color: #e1e3e0;
	margin-bottom: 12px;
`;

const ListActivites = styled.ul`
	list-style: none;
	padding: 0 !important;
	margin: 0 !important;
`;

const ItemActivies = styled.li`
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 8px;
`;

const TimeWrap = styled.div`
	flex: 0 1 auto;
	padding-right: 16px;
`;

const TextTime = styled.span`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: rgba(225, 227, 224, 0.38);
`;

const DetailWrap = styled.div``;

const TitleDetail = styled.h6`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.1px;
	color: #e1e3e0;
	margin-bottom: 0;
`;

const DetailLinkWrap = styled.div``;

const TextLink = styled.span`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: rgba(225, 227, 224, 0.38);
	padding-right: 4px;
`;

const ImgIcon = styled.img`
	cursor: pointer;
`;

export default OverviewActivies;
