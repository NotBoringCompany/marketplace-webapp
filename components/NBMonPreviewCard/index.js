import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { TextSecondary } from "components/Typography/Texts";
import { mediaBreakpoint } from "utils/breakpoints";

const Card = styled.div`
	padding: 24px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;

	p {
		margin: 0;
	}
	& svg {
		font-size: 24px;
	}
	background: linear-gradient(180deg, #191818 0%, #272626 100%);

	& .genusName {
		font-size: 23px;
	}

	@media ${mediaBreakpoint.down.xl} {
		& .genusName {
			font-size: 28px;
		}
	}

	& .male {
		color: #6597f8;
	}

	& .female {
		color: #ff8eed;
	}
`;

const MutatedText = styled(TextSecondary)`
	font-weight: 600;
	font-size: 14px;
`;
const NBMonPreviewCard = ({ nbMon }) => {
	return (
		<Card className="bg-gray text-white">
			<div className="justify-content-center d-flex align-items-center">
				<HeadingSuperXXS as="p" className=" genusName">
					{nbMon.genus}
					{nbMon.gender === "male" ? (
						<IoMdMale className="ms-2 male" />
					) : (
						<IoMdFemale className="ms-2 female" />
					)}
				</HeadingSuperXXS>
			</div>
			<div className="w-100 my-2 d-flex flex-column align-items-center justify-content-center">
				<TextSecondary>
					#{nbMon.nbmonId} - {nbMon.fertility} Fertility
				</TextSecondary>
				<MutatedText className="mt-1">
					{nbMon.mutation === "mutated" ? "Mutated" : "Not mutated"}
				</MutatedText>
			</div>
			<div className="d-flex">
				<p>Rarity: {nbMon.rarity}</p> <p>Species: {nbMon.species}</p>
			</div>
		</Card>
	);
};

export default NBMonPreviewCard;
