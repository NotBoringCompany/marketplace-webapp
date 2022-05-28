import React from "react";
import Button from "react-bootstrap/Button";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";
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

const WarningLogo = (props) => (
	<svg
		width={22}
		height={19}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M0 19h22L11 0 0 19Zm12-3h-2v-2h2v2Zm0-4h-2V8h2v4Z"
			fill="#FFB4A9"
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
	color: #e1e3e0;
	border: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`;

const CancelButton = styled(Button)`
	background: #ffb4a9;
	border-radius: 100px;
	padding: 10px 12px;

	font-family: "Lexend";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	display: flex;
	text-align: center;
	letter-spacing: 0.1px;

	color: #930006;
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
				Marketplace Approval • {completed ? `Done` : `Pending`}
			</Title>
			<SubTitle className="text-gray mt-2">
				Are you sure you want to cancel the listing?{" "}
			</SubTitle>

			{!completed && (
				<SubTitle className="text-gray mt-2">
					Waiting for confirmation....
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
						Confirm {price} WETH Listing {status === 1 && `• Pending`}
						{status === 2 && `• Confirmed`}
					</Title>
					<SubTitle className="text-gray mt-2">
						You are listing your NBMon for {price} WETH.
					</SubTitle>

					{status === 1 && (
						<SubTitle className="text-gray mt-2">
							Waiting for confirmation....
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

const CancelListing = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;

	const { onClickCancel, stage } = getter;

	return (
		<div className="p-4 d-flex flex-column text-start align-items-center">
			<WarningLogo className="overflow-visible" />
			<TextPrimary className="my-2 mt-3">
				{stage === 0 ? `Cancel Listing?` : `Listing Cancelled`}
			</TextPrimary>

			<div className="d-flex flex-column">
				{stage === 0 && (
					<SubTitle className="text-gray mt-1 mb-3">
						Are you sure you want to cancel the listing?
					</SubTitle>
				)}

				<SubTitle className={`text-gray mb-4 ${stage === 1 && `mt-2`}`}>
					Your NBMon won{"'"}t be available in the marketplace anymore.
				</SubTitle>

				{stage === 0 && (
					<CancelButton
						onClick={onClickCancel}
						variant="danger"
						className="mx-auto mt-1 mb-3"
					>
						Cancel Listing
					</CancelButton>
				)}

				<OkButton
					onClick={() => {
						setter({ ...getter, show: false });
					}}
				>
					Go Back
				</OkButton>
			</div>
		</div>
	);
};

export default CancelListing;
