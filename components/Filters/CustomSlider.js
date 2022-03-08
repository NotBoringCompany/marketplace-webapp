import ReactSlider from "react-slider";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 4px;
	margin-bottom: 32px;

	@media ${mediaBreakpoint.down.xl} {
		height: 8px;
	}
`;

const StyledThumb = styled.div`
	top: -6px;
	height: 16px;
	line-height: 16px;
	width: 16px;
	text-align: center;
	background-color: #c4c4c4;
	color: #fff;
	border-radius: 50%;
	cursor: grab;

	@media ${mediaBreakpoint.down.xl} {
		top: -13px;
		height: 32px;
		line-height: 32px;
		width: 32px;
		&:focus {
			outline: none;
		}
	}
`;

const StyledTrack = styled.div`
	top: 0;
	bottom: 0;
	background: ${(props) => (props.index === 1 ? "#42ca9f" : "gray")};
	border-radius: 999px;
`;

import React from "react";

const CustomSlider = ({
	values = [0, 0],
	onChange = () => {},
	max = 0,
	min = 100,
}) => {
	const Thumb = (props) => <StyledThumb {...props}></StyledThumb>;

	const Track = (props, state) => (
		<StyledTrack {...props} index={state.index} />
	);

	return (
		<StyledSlider
			max={max}
			min={min}
			onChange={(v) => onChange(v)}
			defaultValue={values}
			renderTrack={Track}
			renderThumb={Thumb}
		/>
	);
};

export default CustomSlider;