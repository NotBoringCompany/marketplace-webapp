import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { TextSecondary } from "components/Typography/Texts";
import { mediaBreakpoint } from "utils/breakpoints";
import Pill from "components/Pill";
import Image from "react-bootstrap/Image";
import { data } from "configs";

const Card = styled.div`
	padding: 16px;
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
	}

	& .lamox {
		filter: drop-shadow(10px 5px 10px rgba(107, 11, 255, 0.6));
	}

	& .birvo {
		filter: drop-shadow(10px 5px 10px rgba(79, 190, 189, 0.5));
	}

	& .heree {
		filter: drop-shadow(10px 5px 10px rgba(79, 190, 189, 0.5));
	}

	& .heree {
		filter: drop-shadow(10px 5px 10px rgba(54, 134, 27, 0.8));
	}

	& .pongu {
		filter: drop-shadow(10px 5px 10px rgba(245, 245, 245, 0.2));
	}

	& .milnas {
		filter: drop-shadow(10px 5px 10px rgba(230, 69, 53, 0.35));
	}
	& .dranexx {
		filter: drop-shadow(10px 5px 10px rgba(242, 221, 194, 0.25));
	}

	& .schoggi {
		filter: drop-shadow(10px 5px 10px rgba(254, 212, 128, 0.4));
	}

	& .licorine {
		filter: drop-shadow(10px 5px 10px rgba(253, 145, 38, 0.5));
	}

	& .prawdek {
		filter: drop-shadow(10px 5px 10px rgba(251, 228, 179, 0.4));
	}

	& .roggo {
		filter: drop-shadow(10px 5px 10px rgba(186, 231, 142, 0.4));
	}

	& .todillo {
		filter: drop-shadow(10px 5px 10px rgba(147, 96, 67, 0.8));
	}
`;

const NBMonPreviewCard = ({ nbMon, ...props }) => {
	const { className } = props;
	return (
		<Card className={`bg-gray text-white align-items-center ${className}`}>
			<Image
				className={`nbmonImg ${nbMon.genera}`}
				src={data.genera[nbMon.genera].imageurl}
				alt="nbmon"
				width={160}
				height={160}
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
			<div className="d-flex flex-wrap align-items-center mt-2 justify-content-center">
				<Pill content={nbMon.species} />
				<Pill content={nbMon.rarity} />
			</div>
			<div className="mt-2"></div>
			<Pill
				className="mt-2 mx-auto"
				content={nbMon.mutation === "mutated" ? "Mutated" : "Not mutated"}
			/>
		</Card>
	);
};

export default NBMonPreviewCard;
