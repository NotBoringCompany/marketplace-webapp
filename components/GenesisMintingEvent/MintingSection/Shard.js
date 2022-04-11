import React from "react";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
export const ShardComponent = styled.div`
	width: 0;
	position: absolute;
	height: 0;
	bottom: 0;
	right: 0;
	border-bottom: 310px solid rgba(255, 255, 255, 0.16);
	border-left: 400px solid transparent;

	@media ${mediaBreakpoint.down.md} {
		border-bottom: 170px solid rgba(255, 255, 255, 0.16);
		border-left: 580px solid transparent;
	}
`;

const Shard = () => {
	return <ShardComponent />;
};

export default Shard;
