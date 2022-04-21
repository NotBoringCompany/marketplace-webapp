import React from "react";
import Image from "next/image";
import { nbmonColorSchemes, IMAGE_PATH } from "configs/nbmonColorSchemes";
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
	padding: 8px 24px;
	padding-bottom: 10px;
	border-radius: 23px;
	font-size: 16px;
	line-height: 16px;
	box-shadow: ${(props) => (props.shadow ? props.shadow : `unset`)};
	& .myContainer {
		margin-top: 2px;
	}
`;

const NewPill = ({ pillType = "fertility", content = null, ...props }) => {
	content = content ? content.toLowerCase() : pillType;

	let modifiedPillType = pillType === "mutation" ? "type" : pillType;

	const exists =
		modifiedPillType in nbmonColorSchemes.colors &&
		content in nbmonColorSchemes.colors[modifiedPillType];
	const imageDecider = () => {
		const set = new Set(["rarity", "mutation", "type"]);
		return set.has(pillType);
	};

	if (modifiedPillType === "rarity" && exists) {
		return (
			<BigPillContainer
				bg={nbmonColorSchemes.colors["rarity"][content].background}
				color={nbmonColorSchemes.colors["rarity"][content].text}
				shadow={nbmonColorSchemes.colors["rarity"][content].shadow}
				{...props}
			>
				<Image
					src={`${IMAGE_PATH}/rarity/${content}.svg`}
					alt={content.toLowerCase()}
					width={16}
					height={16}
				/>
				<div className="ms-1 myContainer">{content}</div>
			</BigPillContainer>
		);
	}

	return (
		<PillContainer
			bg={
				exists
					? nbmonColorSchemes.colors[modifiedPillType][content].background
					: nbmonColorSchemes.colors["default"].background
			}
			color={
				exists
					? nbmonColorSchemes.colors[modifiedPillType][content].text
					: nbmonColorSchemes.colors["default"].text
			}
			{...props}
		>
			{modifiedPillType === "species" ? (
				<Image
					src={`${IMAGE_PATH}/${content}.svg`}
					alt={pillType}
					width={16}
					height={16}
				/>
			) : (
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
			)}

			<div className="ms-2 ">
				{pillType === "mutation" && "Mutated: "}
				{content}
			</div>
		</PillContainer>
	);
};

export default NewPill;
