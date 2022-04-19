import { TextSecondary } from "components/Typography/Texts";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";

/**
 * Props:
 * @param MouseEventHandler prevOnClick
 * @param MouseEventHandler nextOnClick
 * @param boolean prevDisabled
 * @param boolean nextDisabled
 * @param number currentPage
 * @param number totalPage
 * @param ChangeEventHandler onChangeCurrent
 * @returns JSX.Element
 */
const Pagination = ({
	prevOnClick,
	nextOnClick,
	prevDisabled,
	nextDisabled,
	currentPage,
	totalPage,
	onChangeCurrent,
	onBlurCurrent,
}) => {
	return (
		<PaginationWrap className="text-white">
			<BtnArrow disabled={prevDisabled} onClick={prevOnClick}>
				<i>
					<FaChevronLeft />
				</i>
			</BtnArrow>

			<CurrentPage
				value={currentPage > 0 ? Number(currentPage) : ""}
				onChange={onChangeCurrent}
				type="text"
				onBlur={onBlurCurrent}
			/>

			<TextOf>of</TextOf>

			<TotalPage>{totalPage}</TotalPage>

			<BtnArrow disabled={nextDisabled} onClick={nextOnClick}>
				<i>
					<FaChevronRight />
				</i>
			</BtnArrow>
		</PaginationWrap>
	);
};

const PaginationWrap = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	padding: 0 16px;

	@media ${mediaBreakpoint.down.md} {
		justify-content: flex-start;
	}
`;

const BtnArrow = styled.button`
	border: none;
	padding: 0;
	margin: 0;
	background: transparent;
	color: #e1e3e0;
	font-size: 16px;

	&:disabled {
		color: #404944;
	}
`;

const CurrentPage = styled.input`
	padding: 2px 15px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 38px;
	color: #ffffff;
	font-size: 14px;
	flex: 0 1 auto;
	margin: 0 8px 0 16px;
	border: none;
	text-align: center;
	width: 60px;
`;

const TextOf = styled(TextSecondary)`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.25px;
`;

const TotalPage = styled.div`
	margin: 0 20px 0 16px;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.25px;
`;

export default Pagination;
