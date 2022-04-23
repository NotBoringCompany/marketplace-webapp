import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextSecondary } from "components/Typography/Texts";
export const StatsContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;
export const StatsText = styled(TextSecondary)`
	font-size: 16px;
	letter-spacing: 0.2px;

	@media ${mediaBreakpoint.down.md} {
		font-size: 14px;
	}
`;
