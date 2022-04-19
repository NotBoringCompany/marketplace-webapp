import React, { useState } from "react";
import Image from "next/image";
import Collapse from "react-bootstrap/Collapse";
import styled from "styled-components";

const Container = styled.div`
	& .d-grid {
		grid-template-columns: 1fr 1fr;
	}
`;

const CollapseHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 250ms;

	margin-bottom: 16px;

	&:hover {
		cursor: pointer;
	}

	.caret {
		transition: all 250ms;
		${(props) => props.open && `transform: rotate(180deg);`}
	}
`;

const Separator = styled.div`
	width: 100%;
	height: 2px;
	background: #42ca9f;
`;

const TitleFilter = styled.h5`
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0.1px;
	color: #E1E3E0;
`

const CollapseFilter = ({
	id,
	title = "Title",
	children,
	allowCollapse = true,
}) => {
	const [open, setOpen] = useState(true);

	return (
		<Container className="text-white">
			<CollapseHeader
				open={open}
				onClick={() => {
					if (allowCollapse) setOpen(!open);
				}}
			>
				<TitleFilter className="text-capitalize">
					{title === "genera" ? "Genus" : title}
				</TitleFilter>

				{allowCollapse && (
					<Image
						className="caret"
						src='/images/caret_small_icon.svg'
						width={12}
						height={12}
						alt="Caret"
					/>
				)}
			</CollapseHeader>

			<Collapse in={open}>
				<div id={`collapse-filter-${id}`}>{children}</div>
			</Collapse>
		</Container>
	);
};

export default CollapseFilter;
