import React from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import { TextPrimary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";
const Container = styled.div`
	min-height: calc(100vh - 105px - 70px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const NotFound = () => {
	return (
		<Layout>
			<Container>
				<TextPrimary className="text-white">
					Oops... We can't find this page. 😅
				</TextPrimary>
				<MyButton
					isLink
					href="/nbmons"
					className="mt-3"
					text={"Go back home"}
					variant="outline-secondary"
				/>
			</Container>
		</Layout>
	);
};

export default NotFound;
