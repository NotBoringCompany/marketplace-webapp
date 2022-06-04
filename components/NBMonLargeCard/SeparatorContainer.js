import React from "react";
import styled from "styled-components";

const Container = styled.div`
	padding: ${(props) => (props.small ? `16px` : `24px`)} 0;
	border-top: ${(props) => (props.notop ? `none` : `1px solid #2d2d2d`)};
	border-bottom: 1px solid #2d2d2d;
`;

const SeparatorContainer = ({
	noTop = false,
	small = false,
	className,
	children,
}) => {
	return (
		<Container notop={noTop} small={small} className={className}>
			{children}
		</Container>
	);
};

export default SeparatorContainer;
