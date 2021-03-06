import React from "react";
import { useRouter } from "next/router";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";

const BigCheckmarkSuccess = (props) => (
	<svg
		width={40}
		height={40}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M20 0C8.96 0 0 8.96 0 20s8.96 20 20 20 20-8.96 20-20S31.04 0 20 0Zm-4 30L6 20l2.82-2.82L16 24.34 31.18 9.16 34 12 16 30Z"
			fill="#67DBB1"
		/>
	</svg>
);

const CheckmarksLogoSVG = (props) => (
	<svg
		width={40}
		height={32}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M40 7.07H22v4h18v-4Zm0 16H22v4h18v-4Zm-32.92-8L0 7.99l2.82-2.82 4.24 4.24L15.54.93l2.82 2.82L7.08 15.07Zm0 16L0 23.99l2.82-2.82 4.24 4.24 8.48-8.48 2.82 2.82L7.08 31.07Z"
			fill="#67DBB1"
		/>
	</svg>
);

const CheckmarkSVG = (props) => (
	<svg
		width={20}
		height={20}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0ZM8 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9Z"
			fill="#E1E3E0"
		/>
	</svg>
);

const DotSVG = ({ fill = "#67DBB1", ...props }) => (
	<svg
		width={20}
		height={20}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"
			fill={fill}
		/>
		<path
			d="M5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM15 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
			fill={fill}
		/>
	</svg>
);

const HourglassSVG = (props) => (
	<svg
		width={13}
		height={20}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="m12.5 20-.01-6-3.99-4 3.99-4.01L12.5 0H.5v6l4 4-4 3.99V20h12ZM2.5 5.5V2h8v3.5l-4 4-4-4Z"
			fill="#67DBB1"
		/>
	</svg>
);

const Title = styled(TextSecondary)`
	font-size: 14px;
	line-height: 20px;
	font-weight: 500;
	text-align: left;
`;

const SubTitle = styled(Title)`
	line-height: 18px;
	font-weight: 400;
`;

const ListingItemLoadingContainer = styled.div`
	margin-top: 32px;
`;

const OkButton = styled.button`
	background: none;
	color: #67dbb1;
	border: none;
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
`;
const ApprovalStage = ({ completed = false }) => (
	<div className="d-flex w-100 mt-3">
		{completed ? (
			<CheckmarkSVG className="overflow-visible" />
		) : (
			<DotSVG className="overflow-visible" />
		)}
		<div className="ms-2 d-flex flex-column">
			<Title className={`text-${completed ? `white` : `success`}`}>
				Marketplace Approval ??? {completed ? `Done` : `Pending`}
			</Title>
			<SubTitle className="text-gray mt-2">
				We need your approval for our marketplace to access your NFTs.
			</SubTitle>

			{!completed && (
				<SubTitle className="text-gray mt-2">
					<b>Waiting for confirmation...</b>{" "}
					<i>
						If you{"'"}ve confirmed, please allow several moments to wait until
						the transaction has been resolved in the blockchain.
					</i>{" "}
					????
				</SubTitle>
			)}
		</div>
	</div>
);

const ListingStage = ({ price = 0.5, status = 0 }) => {
	const colorArr = ["gray", "success", "white"];
	return (
		<div className="d-flex flex-column w-100 mt-3">
			<div className="d-flex">
				{status === 0 || status === 1 ? (
					<DotSVG
						className="overflow-visible"
						fill={status === 0 ? `#aaaaaa` : `#67DBB1`}
					/>
				) : (
					<CheckmarkSVG className="overflow-visible" />
				)}

				<div className="ms-2 d-flex flex-column">
					<Title className={`text-${colorArr[status]}`}>
						Confirm {price} WETH Listing {status === 1 && `??? Pending`}
						{status === 2 && `??? Confirmed`}
					</Title>
					<SubTitle className="text-gray mt-2">
						You are listing your NBMon for {price} WETH.
					</SubTitle>

					{status === 1 && (
						<SubTitle className="text-gray mt-2">
							Waiting for confirmation...
						</SubTitle>
					)}
				</div>
			</div>
			{status === 2 && (
				<ListingItemLoadingContainer className="d-flex align-items-center justify-content-center w-100">
					<HourglassSVG className="overflow-visible" />
					<Title className="text-success ms-2">Listing item...</Title>
				</ListingItemLoadingContainer>
			)}
		</div>
	);
};

const SellNBMon = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const { stage, price } = getter;
	const router = useRouter();
	return (
		<div className="p-4 d-flex flex-column text-center align-items-center">
			<CheckmarksLogoSVG className="overflow-visible" />
			<TextPrimary className="mb-2 mt-4">
				{stage === 3 ? `Item Successfully Listed` : `Checking Requirements`}
			</TextPrimary>

			{stage === 0 && (
				<>
					<ApprovalStage />
					<ListingStage status={0} price={price} />
				</>
			)}

			{stage === 1 && (
				<>
					<ApprovalStage completed />
					<ListingStage status={1} price={price} />
				</>
			)}

			{stage === 2 && (
				<>
					<ApprovalStage completed />
					<ListingStage status={2} price={price} />
				</>
			)}

			{stage === 3 && (
				<div className="d-flex flex-column">
					<SubTitle className="text-gray text-center my-5">
						You{"'"}ve successfully listed your NBMon for sale!
					</SubTitle>
					<OkButton
						onClick={() => {
							setter({ ...getter, show: false });
						}}
						className="ms-auto"
					>
						OK
					</OkButton>
				</div>
			)}
		</div>
	);
};

export default SellNBMon;
