import Link from "next/link";
import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { MdArrowBackIos } from "react-icons/md";

const StyledButton = styled(Button)`
	padding: ${(props) =>
		props.pill ? (props.big ? `10px 29px` : `6px 22px`) : `8px 24px;`};
	border-radius: ${(props) => (props.pill ? `60px` : `9px`)};
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
	pill = false,
	big = false,
	...props
}) => {
	let textColor = "text-light";
	if (variant && variant.includes("outline-"))
		textColor = variant.split("-")[0];
	const LinkComponent = (
		<Link href={href} passHref={passHref}>
			<a href={href} target={target}>
				<StyledButton
					big={big ? 1 : 0}
					pill={pill ? 1 : 0}
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
			pill={pill ? 1 : 0}
			big={big ? 1 : 0}
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
