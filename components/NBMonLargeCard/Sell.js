import React, { useState, useContext, useEffect } from "react";
import { TextNormal } from "components/Typography/Texts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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
	margin-top: 32px;
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
const StyledButton = styled(MyButton)`
	padding: 8px 40px;

	padding-bottom: 10px;
	font-size: 12px;
`;

const TabsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: transparent;
	width: 100%;
	align-items: center;
	& .tab-content {
		margin-top: 16px !important;
		width: 100%;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 0;
	}
`;

const StyledTabs = styled(Tabs)`
	border-bottom: none !important;
	display: flex;
	width: 100%;
	& > li {
		margin-right: 0;
		border-radius: 0%;
		width: calc(100% / 3);
	}

	& > li:first-child {
		margin-right: 0;
		border-radius: 0%;
		border-right: none;
	}

	& > li button {
		padding: 6px;
		font-weight: 600;
	}

	& .nav-link {
		background: #363636;
		padding: 8px 16px;
		border-radius: 0;
		border: none;
		color: #bfc9c2;
		width: 100%;
		font-size: 13px;
		font-weight: 400;
		line-height: 20px;
		color: #e1e3e0;

		border: 1.5px solid #89938d;
	}

	& .nav-link.active {
		color: #003827;
		background: #42ca9f;
		border: 1.5px solid #89938d;
	}

	& > li:first-child .nav-link {
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	& > li:last-child .nav-link {
		border-left: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	& .nav-link:hover,
	& .nav-link:focus {
		border: 1.5px solid #89938d;
	}

	@media ${mediaBreakpoint.down.lg} {
		& > li {
			width: 100%;
			margin-right: 0;
			margin-bottom: 8px;
		}

		& > li:last-child {
			margin-bottom: 0;
		}

		& > li > button {
			width: 100%;
		}

		& .nav-link,
		& .nav-link.active {
			border: none;
		}

		& .nav-link:hover,
		& .nav-link:focus {
			border: none;
		}

		& > li:first-child .nav-link,
		& > li:last-child .nav-link {
			border-radius: 4px;
		}
	}
`;

const Sell = ({ setListed, setKey, setListedPrices }) => {
	const currentDate = Date.now();
	const timePlusFiveMinutes = new Date(currentDate + 60 * 1000 * 5);

	const [price, setPrice] = useState(1);

	const [dateValue, setDateValue] = useState(new Date(currentDate));
	const [timeValue, setTimeValue] = useState(
		`${timePlusFiveMinutes.getHours()}:${
			timePlusFiveMinutes.getMinutes() < 10 ? `0` : ``
		}${timePlusFiveMinutes.getMinutes()}`
	);
	const [actualDateAndTime, setActualDateAndTime] = useState(0);

	const [btnDisabled, setBtnDisabled] = useState(true);

	const { statesSwitchModal } = useContext(AppContext);

	useEffect(() => {
		if (dateValue) {
			const formattedDateAndtime = `${
				dateValue.getMonth() + 1
			}/${dateValue.getDate()}/${dateValue.getFullYear()} ${timeValue}`;
			const parsed = Date.parse(new Date(formattedDateAndtime));
			setActualDateAndTime(parsed);
		} else {
			setBtnDisabled(true);
		}
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
					<OptionText className="mb-2">Option</OptionText>
					<TabsContainer>
						<StyledTabs onSelect={(k) => {}} activeKey={"fixed"}>
							<Tab eventKey="fixed" title="Fixed">
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
							</Tab>
							<Tab eventKey="timedAuction" title="Timed Auction">
								<>asdsad</>
							</Tab>
							<Tab eventKey="bidding" title="Bidding">
								<>asdsad</>
							</Tab>
						</StyledTabs>
					</TabsContainer>

					<div className="mx-auto mt-4">
						<StyledButton
							textColor={"text-black"}
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
