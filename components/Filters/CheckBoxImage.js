import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";
import { useFilterStore } from "stores/filterStore";
import { genusImages } from "configs";
const StyledCheckBox = styled(Form.Check)`
	display: flex;
	align-items: center;
	position: absolute;
	top: 5px;
	right: 10px;
	border: none;
	margin: 0;
	padding: 0;

	& input {
		transition: all 100ms;
		background: #278b6c;
		width: 26px;
		height: 26px;
		border: none;
	}

	& input:hover {
		cursor: pointer;
	}

	& input:checked {
		background: #278b6c;
		border: none;
	}
`;

const Container = styled.div`
	width: 84px;
	height: 84px;
	display: flex;
	background: #42ca9f;
	position: relative;
	border-radius: 10px;
	transition: 0.35s all;
	&:hover {
		cursor: pointer;
		transform: scale(1) translate(1px, -3px);
	}

	& *:hover {
		cursor: pointer;
	}

	& img {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
`;

const NameContainer = styled.div`
	height: 24px;
	width: 100%;
	background: #278b6c;
	bottom: 0;
	position: absolute;
	text-align: center;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

const CheckBoxImage = ({ kind, ...props }) => {
	const addFilter = useFilterStore((state) => state.addFilter);
	const removeFilter = useFilterStore((state) => state.removeFilter);
	const clearingFilter = useFilterStore((state) => state.clearing);
	const selectedGenus = useFilterStore((state) =>
		state.selectedFilters.genus ? state.selectedFilters.genus : {}
	);
	const [checked, setChecked] = useState(false);
	const checkBoxRef = useRef(null);

	useEffect(() => {
		setChecked(false);
	}, [clearingFilter]);

	useEffect(() => {
		if (Object.keys(selectedGenus).length > 0) {
			const isChecked = Object.keys(selectedGenus).includes(
				props.label.toLowerCase()
			);
			setChecked(isChecked);
		}
	}, []);

	const handleCheckboxClicked = (e) => {
		e.stopPropagation();
	};

	const handleOnChange = (e) => {
		setChecked(e.target.checked);
		if (e.target.checked) {
			addFilter({ prop: kind, item: e.target.value });
		} else {
			removeFilter({ prop: kind, item: e.target.value });
		}
	};

	const handleClickContainer = () => checkBoxRef && checkBoxRef.current.click();

	return (
		<Container onClick={handleClickContainer}>
			<img src={genusImages[props.label.toLowerCase()].imageurl} alt="NBMon" />
			<StyledCheckBox
				ref={checkBoxRef}
				checked={checked}
				type={"checkbox"}
				onClick={(e) => handleCheckboxClicked(e)}
				onChange={(e) => handleOnChange(e)}
				{...props}
				value={props.label.toLowerCase()}
				label=""
			/>
			<NameContainer>
				<TextSecondary as="label">{props.label}</TextSecondary>
			</NameContainer>
		</Container>
	);
};

export default CheckBoxImage;
