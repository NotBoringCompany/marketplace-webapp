import React, { useState } from "react";
import styled from "styled-components";
import { useSortStore } from "stores/sortStore";

const SelectSort = ({ list = [], defaultValue }) => {
	const [selected, setSelected] = useState(defaultValue);
	const [isOpen, setIsOpen] = useState(false);
	const changeSortType = useSortStore((states) => states.changeSortType);

	return (
		<Wrapper>
			<TextTypeSort onClick={() => setIsOpen(!isOpen)}>{selected}</TextTypeSort>

			{isOpen && (
				<ListSelect>
					{list.length >= 1 &&
						list.map((data, i) => (
							<Item
								key={i}
								className={selected == data.name && "active"}
								onClick={(e) => {
									setSelected(e.target.textContent);
									changeSortType(e.target.textContent);
									setIsOpen(false);
								}}
							>
								{data.name}
							</Item>
						))}
				</ListSelect>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	margin-right: 8px;
`;

const TextTypeSort = styled.span`
	cursor: pointer;
	border-radius: 8px;
	color: #e1e3e0;
	font-size: 14px;
	flex: 0 1 auto;
	padding: 6px 12px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
`;

const ListSelect = styled.ul`
	border: 1px solid #41b995;
	position: absolute !important;
	z-index: 99;
	top: 35px;
	list-style: none;
	margin: 0 !important;
	padding: 8px 0 !important;
	position: absolute;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	width: 190px;
	border-radius: 10px;
`;

const Item = styled.li`
	color: #e1e3e0;
	padding: 4px 12px;
	cursor: pointer;

	&:hover {
		color: #42ba96;
	}

	&.active {
		color: #42ba96;
	}
`;

export default SelectSort;
