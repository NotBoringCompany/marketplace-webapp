import React, { useState } from "react";
import Image from "next/image";
import Collapse from "react-bootstrap/Collapse";
import Caret from "../../public/images/caret_down.svg";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";

const Container = styled.div``;

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
const Title = styled(HeadingSuperXXS)`
	font-size: 24px;
`;
const CollapseFilter = ({ id, title = "Title", children }) => {
	const [open, setOpen] = useState(false);
	return (
		<Container className="text-white">
			<CollapseHeader open={open ? 1 : 0} onClick={() => setOpen(!open)}>
				<Title className="text-white">{title}</Title>
				<Image
					className="caret"
					src={Caret}
					width={16}
					height={16}
					alt="Caret"
				/>
			</CollapseHeader>

			<Collapse in={open}>
				<div id={`collapse-filter-${id}`}>{children}</div>
			</Collapse>
		</Container>
	);
};

export default CollapseFilter;
