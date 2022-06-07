import Link from "next/link";
import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { MdArrowBackIos } from "react-icons/md";

import { mediaBreakpoint } from "utils/breakpoints";

const StyledButton = styled(Button)`
	padding: ${(props) =>
		props.pill ? (props.big ? `10px 24px` : `4px 22px`) : `8px 24px;`};
	border-radius: ${(props) => (props.pill ? `60px` : `9px`)};
	transition: 0.35s all;

	&:hover {
		transform: scale(1.01) translate(1px, -3px);
	}
`;
const StyledP = styled.p`
	font-family: "Lexend";
	font-weight: ${(props) => (props.thin ? `400` : `600`)};
	font-size: ${(props) => (props.big ? `21px` : `16px`)};

	@media ${mediaBreakpoint.down.md} {
		font-size: ${(props) => (props.big ? `18px` : `14px`)};
	}
`;
const MyButton = ({
	text,
	onClick,
	variant = "secondary",
	className,
	isLink = false,
	img = null,
	icon = null,
	backIcon = false,
	href = "/",
	newTab = false,
	passHref = false,
	target = "_self",
	pill = false,
	big = false,
	thinText = false,
	...props
}) => {
	let textColor = "text-light";
	if (variant && variant.includes("outline-"))
		textColor = variant.split("-")[0];
	target = newTab ? `_blank` : target;
	const LinkComponent = (
		<Link href={href} passHref={passHref}>
			<a href={href} target={target} rel="noopener noreferrer">
				<StyledButton
					big={big ? 1 : 0}
					pill={pill ? 1 : 0}
					variant={variant}
					className={`d-flex align-items-center justify-content-center ${className}`}
					{...props}
				>
					{backIcon && <MdArrowBackIos />}
					{icon && icon}
					{img && (
						<Image
							alt="img"
							src={img}
							width={32}
							height={32}
							className="me-2"
						/>
					)}
					<StyledP big={big ? 1 : 0} className={textColor} thin={thinText}>
						{text}
					</StyledP>
				</StyledButton>
			</a>
		</Link>
	);
	const RegularButton = (
		<StyledButton
			pill={pill ? 1 : 0}
			big={big ? 1 : 0}
			variant={variant}
			onClick={onClick}
			className={`d-flex align-items-center justify-content-center ${className}`}
			{...props}
		>
			{icon && icon}
			{img && (
				<Image alt="img" src={img} width={32} height={32} className="me-2" />
			)}
			<StyledP big={big} className={textColor} thin={thinText}>
				{text}
			</StyledP>
		</StyledButton>
	);
	const rendered = isLink ? <>{LinkComponent}</> : <>{RegularButton}</>;
	return <>{rendered}</>;
};

export default MyButton;
