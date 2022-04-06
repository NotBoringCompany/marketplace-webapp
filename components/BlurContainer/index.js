import React from "react";
import styled from "styled-components";

export const BlurContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	background: rgba(255, 255, 255, 0.16);
	backdrop-filter: blur(6px);
	border-radius: 12px;

	& .checkmark-icon {
		font-size: 24px;
	}

	@-moz-document url-prefix() {
		background: #a6a6a6b5;
	}
`;
