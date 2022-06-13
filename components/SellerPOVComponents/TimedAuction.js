import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import TimePicker from "react-time-picker/dist/entry.nostyle";
import DatePicker from "react-datepicker";

import { TextNormal } from "components/Typography/Texts";
import styled from "styled-components";

const OptionText = styled(TextNormal)`
	font-size: 14px;
	line-height: 20px;
	color: #e1e3e0;
`;

const StyledInputGroup = styled(InputGroup)`
	& input {
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		border: 1.5px solid #89938d;
		color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};
		border-radius: 8px;
		padding: 10px 16px;
		&:focus {
			background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
			color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
		}
	}

	& .input-group-text {
		border: 1.5px solid #89938d;
		border-left: none;
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		color: #fff;
	}
`;

const TimedAuction = ({
	onDateChange = () => {},
	onPriceChange = () => {},
	onTimeValueChange = () => {},
	timeValue = null,
	dateValue = null,
	minDate,
	listedPrices,
}) => {
	const { endPrice, price } = listedPrices;
	const handleChangePrice = (e) => {
		const num = e.target.value;

		if (!isNaN(num)) {
			onPriceChange({
				...listedPrices,
				[e.target.name]: num,
				usd: 1515,
			});
		}
	};

	const handleBlurPriceStart = (e) => {
		if (e.target.value <= 0) {
			if (e.target.name === "weth") {
				onPriceChange({
					...listedPrices,
					[e.target.name]: 0.00001,
					usd: 0.01,
				});
			} else {
				onPriceChange({
					...listedPrices,
					[e.target.name]: 0.00001,
				});
			}
		}
	};

	return (
		<>
			<OptionText className="mb-2">Start Amount</OptionText>
			<StyledInputGroup className="mb-3">
				<FormControl
					name="weth"
					value={price}
					onChange={handleChangePrice}
					onBlur={handleBlurPriceStart}
					placeholder="1"
					aria-label="1"
					type="number"
				/>
				<InputGroup.Text id="basic-addon2">WETH</InputGroup.Text>
			</StyledInputGroup>

			<div className="d-flex flex-md-row flex-column">
				<div className="d-flex flex-column w-100">
					<OptionText className="mb-2">End Date</OptionText>

					<DatePicker
						selected={dateValue}
						minDate={minDate}
						dateFormat="dd/MM/yyyy"
						onChange={(date) => {
							onDateChange(date);
						}}
					/>
				</div>

				<div className="d-flex ms-lg-1 ms-0 flex-column w-100 mt-md-0 mt-3">
					<OptionText className="mb-2">End Time</OptionText>

					<TimePicker
						onChange={(v) => {
							onTimeValueChange(v);
						}}
						onKeyUp={(e) => {
							if (e.target.value > 59) {
								onTimeValueChange(`${timeValue.split(":")[0]}:00`);
							}
						}}
						className="w-100 "
						format={"hh:mm a"}
						value={timeValue}
						clockIcon={null}
						clearIcon={null}
						amPmAriaLabel={"Select AM/PM"}
					/>
				</div>
			</div>

			<OptionText className="mb-2 mt-3">End Amount</OptionText>
			<StyledInputGroup className="mb-3">
				<FormControl
					name="endPrice"
					value={endPrice}
					onChange={handleChangePrice}
					onBlur={handleBlurPriceStart}
					placeholder="1"
					aria-label="1"
					type="number"
				/>
				<InputGroup.Text id="basic-addon2">WETH</InputGroup.Text>
			</StyledInputGroup>
		</>
	);
};

export default TimedAuction;
