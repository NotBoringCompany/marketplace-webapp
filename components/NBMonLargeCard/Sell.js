import React, { useState, useContext, useEffect } from "react";
import { TextNormal } from "components/Typography/Texts";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { InputGroup, FormControl } from "react-bootstrap";
import MyButton from "components/Buttons/Button";
import AppContext from "context/AppContext";
import delay from "utils/delay";

import TimePicker from "react-time-picker/dist/entry.nostyle";
import DatePicker from "react-datepicker";

// import MarketplaceLite from "components/../abis/MarketplaceLite";

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

	@media ${mediaBreakpoint.down.lg} {
		padding: 0;
	}
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
const Sell = ({ setListed, setKey, setListedPrices }) => {
	const currentDate = Date.now();
	const timePlusFiveMinutes = new Date(currentDate + 60 * 1000 * 5);

	const [price, setPrice] = useState(1);

	const [dateValue, setDateValue] = useState(new Date(currentDate));
	const [timeValue, setTimeValue] = useState(
		`${timePlusFiveMinutes.getHours()}:${timePlusFiveMinutes.getMinutes()}`
	);
	const [actualDateAndTime, setActualDateAndTime] = useState(0);

	const [btnDisabled, setBtnDisabled] = useState(true);

	const { statesSwitchModal } = useContext(AppContext);

	useEffect(() => {
		const formattedDateAndtime = `${
			dateValue.getMonth() + 1
		}/${dateValue.getDate()}/${dateValue.getFullYear()} ${timeValue}`;
		const parsed = Date.parse(new Date(formattedDateAndtime));
		setActualDateAndTime(parsed);
	}, [dateValue, timeValue]);

	useEffect(() => {
		if (actualDateAndTime > 0) {
			if (actualDateAndTime < Date.now()) {
				//disable
				setBtnDisabled(true);
			} else {
				//allow to click btn
				setBtnDisabled(false);
			}
		}
	}, [actualDateAndTime]);

	const handleChange = (e) => {
		setPrice(e.target.value);
	};

	const handleBlur = (e) => {
		if (e.target.value <= 0) {
			setPrice(0.0001);
		}
	};

	const handleClick = async () => {
		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 0,
			price,
		});

		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 1,
			price,
		});

		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 2,
			price,
		});
		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 3,
			price,
		});

		setListedPrices({ weth: price, usd: 99 });
		setListed(true);
		setKey("info");
	};

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
							value={price}
							onChange={handleChange}
							onBlur={handleBlur}
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
								minDate={new Date()}
								dateFormat="dd/MM/yyyy"
								onChange={(date) => {
									console.log(date);
									setDateValue(date);
								}}
							/>
						</div>

						<div className="d-flex ms-lg-1 ms-0 flex-column w-100 mt-md-0 mt-3">
							<OptionText className="mb-2">End Time</OptionText>

							<TimePicker
								onChange={(v) => {
									setTimeValue(v);
								}}
								onKeyUp={(e) => {
									if (e.target.value > 59) {
										setTimeValue(`${timeValue.split(":")[0]}:00`);
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

					<div className="mx-auto mt-4">
						<StyledButton
							onClick={handleClick}
							text="Start listing item"
							pill
							disabled={btnDisabled}
							thinText
						/>
					</div>
				</div>
			</InnerContainer>
		</OuterContainer>
	);
};

export default Sell;
