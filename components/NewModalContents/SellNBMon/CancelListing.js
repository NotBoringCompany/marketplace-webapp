import React from "react";
import Button from "react-bootstrap/Button";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import styled from "styled-components";

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
