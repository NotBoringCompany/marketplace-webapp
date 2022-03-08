import Form from "react-bootstrap/Form";
import styled from "styled-components";

const CheckBoxImage = styled(Form.Check)`
	display: flex;
	align-items: center;
	margin-right: 16px;
	margin-bottom: 16px;
	& input {
		transition: all 100ms;
		background: #808080;
		width: 26px;
		height: 26px;
	}

	& input:hover {
		cursor: pointer;
		border: 2px solid #42ca9f;
	}

	& input:checked {
		background: #42ca9f;
	}

	& label {
		margin-top: 7px;
		margin-left: 12px;
	}
`;

export default CheckBoxImage;
