import React from "react";
import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import Link from "next/link";

const OverviewActivies = () => {
	return (
		<div className="py-0 px-3 mt-2 mb-3">
			<TitleWithLink
				title="Activities"
				textLink="View in Block Explorer"
				href="/activities"
			/>

			<BlockActivites>
				<TitleDate>April 22, 2021</TitleDate>

				<ListActivites>
					<CardItemActivities
						time="22:00"
						title="You bought and minted an egg for X eth"
						description="Transaction status (Block Explorer)"
						href="#"
					/>

					<CardItemActivities
						time="22:00"
						title="You bought and minted an egg for X eth"
						description="Transaction status (Block Explorer)"
						href="#"
					/>
				</ListActivites>
			</BlockActivites>
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
					<TextLink>{description}</TextLink>
					<Link href={href}>
						<ImgIcon src="/images/goto_icon.svg" />
					</Link>
				</DetailLinkWrap>
			</DetailWrap>
		</ItemActivies>
	);
};

const BlockActivites = styled.div``;

const TitleDate = styled.h5`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
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
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: rgba(225, 227, 224, 0.38);
`;

const DetailWrap = styled.div``;

const TitleDetail = styled.h6`
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
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
	font-size: 11px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: rgba(225, 227, 224, 0.38);
	padding-right: 4px;
`;

const ImgIcon = styled.img`
	cursor: pointer;
`;

export default OverviewActivies;
