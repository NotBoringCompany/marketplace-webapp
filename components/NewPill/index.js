import React from "react";
import Image from "next/image";
import { pillsConfig, IMAGE_PATH } from "configs/pillsConfig";
import styled from "styled-components";

const PillContainer = styled.div`
	background: ${(props) => props.bg};
	color: ${(props) => props.color};
	border-radius: 24px;
	flex-shrink: 0;
	text-transform: capitalize;
	display: flex;
	align-items: center;
	font-family: "Mada";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	padding: 6px 14px;
`;

const BigPillContainer = styled(PillContainer)`
	padding: 10px 24px;
	border-radius: 23px;
	font-size: 16px;
	line-height: 16px;
	box-shadow: ${(props) => (props.shadow ? props.shadow : `unset`)};
`;

const NewPill = ({ pillType = "fertility", content = null, ...props }) => {
	content = content ? content.toLowerCase() : pillType;

	let modifiedPillType = pillType === "mutation" ? "type" : pillType;

	const exists =
		modifiedPillType in pillsConfig.colors &&
		content in pillsConfig.colors[modifiedPillType];
	const imageDecider = () => {
		const set = new Set(["rarity", "mutation", "type"]);
		return set.has(pillType);
	};

	// if (pillType !== "type" && pillTypeDecider()) {
	// 	return (
	// 		<>
	// 			{pillType == "mutation" ? (
	// 				<PillContainer
	// 					bg={pillsConfig.colors["type"][content.toLowerCase()].background}
	// 					color={pillsConfig.colors["type"][content.toLowerCase()].text}
	// 					{...props}
	// 				>
	// 					<Image
	// 						src={`${IMAGE_PATH}/type/${content.toLowerCase()}.svg`}
	// 						alt={`mutated to ${content.toLowerCase()}`}
	// 						width={16}
	// 						height={16}
	// 					/>
	// 					<div className="ms-1">Mutation: {content}</div>
	// 				</PillContainer>
	// 			) : (
	// 				//rarity
	// 				<BigPillContainer
	// 					bg={pillsConfig.colors["rarity"][content.toLowerCase()].background}
	// 					color={pillsConfig.colors["rarity"][content.toLowerCase()].text}
	// 					{...props}
	// 				>
	// 					<Image
	// 						src={`${IMAGE_PATH}/type/${content.toLowerCase()}.svg`}
	// 						alt={content.toLowerCase()}
	// 						width={16}
	// 						height={16}
	// 					/>
	// 					<div className="ms-1">{content}</div>
	// 				</BigPillContainer>
	// 			)}
	// 		</>
	// 	);
	// }

	if (modifiedPillType === "rarity" && exists) {
		return (
			<BigPillContainer
				bg={pillsConfig.colors["rarity"][content].background}
				color={pillsConfig.colors["rarity"][content].text}
				shadow={pillsConfig.colors["rarity"][content].shadow}
				{...props}
			>
				<Image
					src={`${IMAGE_PATH}/rarity/${content}.svg`}
					alt={content.toLowerCase()}
					width={16}
					height={16}
				/>
				<div className="ms-1">{content}</div>
			</BigPillContainer>
		);
	}

	return (
		<PillContainer
			bg={
				exists
					? pillsConfig.colors[modifiedPillType][content].background
					: pillsConfig.colors["default"].background
			}
			color={
				exists
					? pillsConfig.colors[modifiedPillType][content].text
					: pillsConfig.colors["default"].text
			}
			{...props}
		>
			<Image
				src={
					imageDecider()
						? `${IMAGE_PATH}/${modifiedPillType}/${content}.svg`
						: `${IMAGE_PATH}/${pillType}.svg`
				}
				alt={pillType}
				width={16}
				height={16}
			/>

			<div className="ms-2">
				{pillType === "mutation" && "Mutated: "}
				{content}
			</div>
		</PillContainer>
	);
};

export default NewPill;
