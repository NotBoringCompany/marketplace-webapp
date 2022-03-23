import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { TextSecondary } from "components/Typography/Texts";
import { mediaBreakpoint } from "utils/breakpoints";
import Pill from "components/Pill";
import { Image } from "react-bootstrap";

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

	& .nbmonImg {
		border-radius: 100%;
		filter: drop-shadow(10px 5px 10px rgba(107, 11, 255, 0.5));
	}
`;

const NBMonPreviewCard = ({ nbMon, ...props }) => {
	const { className } = props;
	return (
		<Card className={`bg-gray text-white align-items-center ${className}`}>
			<Image
				className="nbmonImg"
				src={"https://svgshare.com/i/fY4.svg"}
				alt="nbmon"
				width={180}
				height={180}
			/>
			<div className="mt-4 justify-content-center d-flex align-items-center">
				<HeadingSuperXXS as="p" className="text-capitalize genusName">
					{nbMon.genera}
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
