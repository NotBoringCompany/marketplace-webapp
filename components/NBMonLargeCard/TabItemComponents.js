import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextSecondary } from "components/Typography/Texts";
export const StatsContainer = styled.div`
	display: flex;
	border-bottom: 2px solid #808080;
	justify-content: space-between;
	width: 100%;
	padding-bottom: 16px;

	margin-top: 16px;
	align-items: center;

	& .male {
		color: #6597f8;
	}

	& .female {
		color: #ff8eed;
	}

	& svg {
		font-size: 24px;
	}
`;
export const StatsText = styled(TextSecondary)`
	font-size: 18px;
	@media ${mediaBreakpoint.down.md} {
		font-size: 14px;
	}
`;
