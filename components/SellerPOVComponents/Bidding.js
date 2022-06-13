import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import TimePicker from "react-time-picker/dist/entry.nostyle";
import DatePicker from "react-datepicker";

import { TextNormal } from "components/Typography/Texts";
import styled from "styled-components";
import { whitespace } from "utils/whitespace";

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

const Bidding = ({
	onDateChange = () => {},
	onPriceChange = () => {},
	onTimeValueChange = () => {},
	timeValue = null,
	dateValue = null,
	minDate,
	biddingPrices,
}) => {
	const { minAmount, reservedAmount } = biddingPrices;
	const handleChangePrice = (e) => {
		const num = e.target.value;

		if (!isNaN(num)) {
			onPriceChange({
				...biddingPrices,
				[e.target.name]: num,
				usd: 1515,
			});
		}
	};

	const handleBlurPrice = (e) => {
		if (e.target.value < 0 || whitespace(e.target.value)) {
			if (e.target.name === "weth") {
				onPriceChange({
					...biddingPrices,
					[e.target.name]: 0,
				});
			} else {
				onPriceChange({
					...biddingPrices,
					[e.target.name]: 0,
				});
			}
		}
	};

	return (
		<>
			<OptionText className="mb-2">Minimum Amount (Optional)</OptionText>
			<StyledInputGroup className="mb-3">
				<FormControl
					name="minAmount"
					value={minAmount}
					onChange={handleChangePrice}
					onBlur={handleBlurPrice}
					placeholder="1"
					aria-label="1"
					type="number"
				/>
				<InputGroup.Text id="basic-addon2">WETH</InputGroup.Text>
			</StyledInputGroup>

			<OptionText className="mb-2 mt-3">Reserved Amount (Optional)</OptionText>
			<StyledInputGroup className="mb-3">
				<FormControl
					name="reservedAmount"
					value={reservedAmount}
					onChange={handleChangePrice}
					onBlur={handleBlurPrice}
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
		</>
	);
};

export default Bidding;
