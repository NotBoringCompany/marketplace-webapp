import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import ReactSlider from "react-slider";
import styled from "styled-components";
import TextInput from "components/FormInputs/TextInput";
import { TextPrimary } from "components/Typography/Texts";
const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 4px;
	margin-bottom: 16px;
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
`;

const StyledTrack = styled.div`
	top: 0;
	bottom: 0;
	background: ${(props) => (props.index === 1 ? "#42ca9f" : "gray")};
	border-radius: 999px;
`;

const TypesFilter = () => {
	const [values, setValues] = useState([0, 75]);
	const Thumb = (props) => <StyledThumb {...props}></StyledThumb>;

	const Track = (props, state) => (
		<StyledTrack {...props} index={state.index} />
	);

	return (
		<CollapseFilter id="fertility" title="Fertility">
			<div id={`collapse-filter-fertility`}>
				<p style={{ margin: 0, marginTop: -6 }}>&nbsp;</p>
				<StyledSlider
					max={80}
					min={0}
					onChange={(v) => setValues(v)}
					defaultValue={values}
					renderTrack={Track}
					renderThumb={Thumb}
				/>
				<div className="mb-3 d-flex align-items-center justify-content-between">
					<TextInput type="number" value={values[0]} variant="dark" />
					<TextPrimary className="mx-3">-</TextPrimary>
					<TextInput type="number" value={values[1]} variant="dark" />
				</div>
			</div>
		</CollapseFilter>
	);
};

export default TypesFilter;
