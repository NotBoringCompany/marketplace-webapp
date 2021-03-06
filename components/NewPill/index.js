import React from "react";
import Image from "next/image";
import { nbmonColorSchemes, IMAGE_PATH } from "configs/nbmonColorSchemes";
import styled from "styled-components";

const PillContainer = styled.div`
	background: ${(props) => props.bg};
	color: ${(props) => props.color};
	border: ${(props) =>
		props.notmutated ? `2px solid ${props.color}` : `unset`};
	border-radius: 24px;
	flex-shrink: 0;
	text-transform: capitalize;
	display: flex;
	align-items: center;
	font-family: "Lexend";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	padding: 6px 14px;
	justify-content: center;

	& > span {
		flex-shrink: 0;
	}
`;

const BigPillContainer = styled(PillContainer)`
	padding: 6px 14px;
	padding-bottom: 7px;
	border-radius: 23px;

	box-shadow: ${(props) => (props.shadow ? props.shadow : `unset`)};
	& .myContainer {
		margin-top: 2px;
	}

	& > span {
		flex-shrink: 0;
	}
`;

const NewPill = ({
	pillType = "fertility",
	content = null,
	noText = false,
	...props
}) => {
	content = content ? content.toString().toLowerCase() : pillType;
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
					width={14}
					height={14}
				/>
				{!noText && <div className="ms-1 myContainer">{content}</div>}
			</BigPillContainer>
		);
	}

	return (
		<PillContainer
			notmutated={content === "not mutated" ? 1 : 0}
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
					width={15}
					height={15}
				/>
			) : (
				<Image
					src={
						imageDecider()
							? `${IMAGE_PATH}/${modifiedPillType}/${content}.svg`
							: `${IMAGE_PATH}/${pillType}.svg`
					}
					alt={pillType}
					width={15}
					height={15}
				/>
			)}
			{!noText && (
				<div className="ms-2 ">
					{pillType === "mutation" && "Mutated: "}
					{content}
				</div>
			)}
		</PillContainer>
	);
};

export default NewPill;
