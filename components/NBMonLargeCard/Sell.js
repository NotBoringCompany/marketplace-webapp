import React from "react";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { TextNormal } from "components/Typography/Texts";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { InputGroup, FormControl } from "react-bootstrap";
import MyButton from "components/Buttons/Button";

const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
`;

const TypesContainer = styled.div`
	max-width: 150px;

	@media ${mediaBreakpoint.down.lg} {
		width: 600px;
	}
`;

const InnerContainer = styled.div`
	background: #2c2d2d;
	padding: 16px;
	border-radius: 12px;
	min-height: 200px;
	width: 100%;
`;

const OuterContainer = styled.div`
	display: flex;
	padding: 0 24px;
`;

const OptionText = styled(TextNormal)`
	font-size: 14px;
	line-height: 20px;
	color: #e1e3e0;
`;

const FixedButton = styled.div`
	width: 100%;
	background: #67dbb1;
	padding: 9px;
	width: 100%;
	border-radius: 4px;
	&:hover {
		cursor: pointer;
	}
`;

const StyledInputGroup = styled(InputGroup)`
	& input {
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		border: 2px solid rgba(176, 176, 176, 0.35);
		color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};
		border-radius: 8px;
		padding: 10px 16px;
		&:focus {
			background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
			color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
		}
	}

	& .input-group-text {
		border: 2px solid rgba(176, 176, 176, 0.35);
		border-left: none;
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		color: #fff;
	}
`;
const StyledButton = styled(MyButton)`
	padding: 8px 24px;
	padding-bottom: 10px;
	font-size: 12px;
`;
const Sell = ({ nbMon }) => {
	return (
		<OuterContainer>
			<InnerContainer className="d-flex flex-column ">
				<div className="d-flex flex-column">
					<OptionText>Option</OptionText>
					<FixedButton className="mt-2 mb-4">
						<OptionText className="text-black text-center">
							Fixed Price
						</OptionText>
					</FixedButton>

					<OptionText className="mb-2">Price</OptionText>
					<StyledInputGroup className="mb-3">
						<FormControl
							placeholder="1"
							aria-label="1"
							aria-describedby="basic-addon2"
						/>
						<InputGroup.Text id="basic-addon2">WETH</InputGroup.Text>
					</StyledInputGroup>

					<div className="mx-auto mt-2">
						<StyledButton text="Start listing item" pill thinText />
					</div>
				</div>
			</InnerContainer>
		</OuterContainer>
	);
};

export default Sell;
