import React from "react";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledPill = styled.div`
	padding: 4px 16px;
	border-radius: 48px;
	text-transform: capitalize;
	background: gray;
	min-width: 72px;
	text-align: center;
	font-weight: 600;
	font-size: 14px;
	color: #fff;
	&.common {
		background: #808080;
	}

	&.origin {
		background: linear-gradient(180deg, #fa13ff 0%, #62298f 100%);
		filter: drop-shadow(0px 0px 16px #ff1ee8);
	}
	&.hybrid {
		background: linear-gradient(180deg, #f14bff 0%, #fe2c2c 100%, #fe2c2c 100%);
		filter: drop-shadow(0px 0px 16px #f14bff);
	}
	&.wild {
		background: linear-gradient(180deg, #fd5a5a 0%, #5f1a11 100%);
		filter: drop-shadow(0px 0px 9px #fd5a5a);
	}

	&.mutation {
		max-width: 120px;
		padding: 4px 16px;
	}

	&.not-mutated {
		background: #000;
	}

	&.mutated {
		background: #7a817f;
	}

	&.common {
		background: linear-gradient(180deg, #87df90 2.6%, #1fac46 100%);
		filter: drop-shadow(0px 0px 5px #87df90);
	}
	&.uncommon {
		background: linear-gradient(180deg, #19dea3 2.6%, #166841 100%);
		filter: drop-shadow(0px 0px 5px #19dea3);
	}
	&.rare {
		background: linear-gradient(180deg, #85ffe2 0%, #2d3cbf 100%);
		filter: drop-shadow(0px 0px 16px #9ca5fb);
	}
	&.epic {
		background: linear-gradient(180deg, #00ffc2 0.52%, #fe71df 93.75%);
		filter: drop-shadow(0px 0px 20px #2b8cff);
	}
	&.legendary {
		background: linear-gradient(
			180deg,
			#ffd700 0%,
			#ffd700 0.01%,
			#ff71e0 100%
		);
		filter: drop-shadow(0px 0px 12px #ffd700);
	}
	&.mythical {
		background: linear-gradient(
			180deg,
			#f5df94 0.01%,
			#8dd186 40.1%,
			#2482b7 100%
		);
		filter: drop-shadow(0px 0px 13px #2bffd9);
	}

	&.types {
		min-width: 120px;
		font-size: 16px;
	}
	&.spirit {
		background: #874fcf;
	}

	&.electric {
		background: #e4bd1c;
	}

	&.fire {
		background: #c64242;
	}
	&.nature {
		background: #3bcf65;
	}

	@media ${mediaBreakpoint.down.md} {
		&.types {
			min-width: 96px;
		}
	}
`;
const Pill = ({ content, types = false, ...props }) => {
	const { className } = props;
	return (
		<StyledPill
			className={`mx-1 ${className} ${types && `types`} ${
				content.toLowerCase().includes("mutate")
					? content.toLowerCase() === "not mutated"
						? `mutation not-mutated`
						: `mutation mutated`
					: `${content.toLowerCase()}`
			}`}
		>
			{content}
		</StyledPill>
	);
};

export default Pill;
