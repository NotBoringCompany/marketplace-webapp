import React, { useState } from "react";
import Image from "next/image";
import Collapse from "react-bootstrap/Collapse";
import Caret from "public/images/caret_down.svg";
import { HeadingSuperXXS } from "components/Typography/Headings";
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
				open={open ? 1 : 0}
				onClick={() => {
					if (allowCollapse) setOpen(!open);
				}}
			>
				<HeadingSuperXXS className="text-white">{title}</HeadingSuperXXS>
				{allowCollapse && (
					<Image
						className="caret"
						src={Caret}
						width={16}
						height={16}
						alt="Caret"
					/>
				)}
			</CollapseHeader>

			<Collapse in={open}>
				<div id={`collapse-filter-${id}`}>{children}</div>
			</Collapse>
			<Separator />
		</Container>
	);
};

export default CollapseFilter;
