import Link from "next/link";
import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { MdArrowBackIos } from "react-icons/md";

const StyledButton = styled(Button)`
	box-shadow: 0px 5px 4px rgba(173, 173, 173, 0.25);
	padding: 8px 24px;
	border-radius: 9px;
	transition: 0.35s all;

	&:hover {
		transform: scale(1.01) translate(1px, -3px);
	}
`;
const StyledP = styled.p`
	font-family: "Mada";
	font-weight: 600;
	font-size: 18px;
`;
const MyButton = ({
	text,
	onClick,
	variant = "secondary",
	className,
	isLink = false,
	img = null,
	backIcon = false,
	href = "/",
	newTab = false,
	passHref = false,
	target = "_self",
	...props
}) => {
	let textColor = "text-light";
	if (variant && variant.includes("outline-"))
		textColor = variant.split("-")[0];
	const LinkComponent = (
		<Link href={href} passHref={passHref}>
			<a href={href} target={target}>
				<StyledButton
					variant={variant}
					className={`d-flex align-items-center justify-content-center ${className}`}
					{...props}
				>
					{backIcon && <MdArrowBackIos />}
					{img && <Image src={img} width={32} height={32} className="me-2" />}
					<StyledP className={textColor}>{text}</StyledP>
				</StyledButton>
			</a>
		</Link>
	);
	const RegularButton = (
		<StyledButton
			variant={variant}
			onClick={onClick}
			className={`d-flex align-items-center justify-content-center ${className}`}
			{...props}
		>
			{img && <Image src={img} width={32} height={32} className="me-2" />}
			<StyledP className={textColor}>{text}</StyledP>
		</StyledButton>
	);
	const rendered = isLink ? <>{LinkComponent}</> : <>{RegularButton}</>;
	return <>{rendered}</>;
};

export default MyButton;
