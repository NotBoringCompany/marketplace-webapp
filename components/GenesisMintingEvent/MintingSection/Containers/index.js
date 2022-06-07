import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";

export const MainSection = styled.div`
	min-height: calc(100vh + 30px);

	@media ${mediaBreakpoint.down.lg} and (orientation: landscape) {
		min-height: calc(100vh + 380px);
	}

	@media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait) {
		min-height: calc(60vh + 100px);
	}

	@media (max-height: 667px) and (orientation: portrait) {
		min-height: calc(100vh + 120px);
	}
`;

export const StyledContainer = styled.video`
	position: absolute;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
`;

export const ContentContainer = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	z-index: 2;
	width: 100%;
	align-items: center;
	padding: 20px;

	& .no-radius-top {
		border-top-right-radius: 0;
		border-top-left-radius: 0;
	}
`;

export const TimersContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 24px;

	& .separator {
		margin: 0 16px;
	}

	@media ${mediaBreakpoint.down.md} {
	}

	@media ${mediaBreakpoint.down.lg} {
		flex-direction: column;
		& .separator {
			margin: 8px 0;
		}
	}
`;

export const MintBtnContainer = styled.div`
	display: flex;
	max-width: 300px;
	flex-direction: column;
	justify-content: center;

	& p {
		max-width: 300%;
		text-align: center;
	}
`;
