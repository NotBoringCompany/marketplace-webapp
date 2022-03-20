import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { TextSecondary } from "components/Typography/Texts";
import { mediaBreakpoint } from "utils/breakpoints";
import Pill from "components/Pill";

const Card = styled.div`
	padding: 24px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	border: 0.2px solid transparent;
	transition: 0.35s all;

	p {
		margin: 0;
	}
	& svg {
		font-size: 24px;
	}
	background: linear-gradient(180deg, #1f1f1f 0%, #272626 100%);

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

	&:hover {
		cursor: pointer;
		transform: translate(2px, -5px);
	}
`;

const NBMonPreviewCard = ({ nbMon, ...props }) => {
	const { className } = props;
	return (
		<Card className={`bg-gray text-white ${className}`}>
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
			<TextSecondary className="text-center my-2">
				#{nbMon.nbmonId} - {nbMon.fertility} Fertility
			</TextSecondary>
			<div className="d-flex align-items-center mt-2 justify-content-center">
				<Pill content={nbMon.rarity} />
				<Pill content={nbMon.species} />
			</div>
			<div className="mt-2"></div>
			<Pill
				content={nbMon.mutation === "mutated" ? "Mutated" : "Not mutated"}
			/>
		</Card>
	);
};

export default NBMonPreviewCard;
