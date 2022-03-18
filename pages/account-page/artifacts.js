import { useMoralis } from "react-moralis";

import Container from "react-bootstrap/Container";

import Layout from "components/Layout";

import styled from "styled-components";
import mustBeAuthed from "utils/mustBeAuthed";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

const Artifacts = () => {
	const { isAuthenticated } = useMoralis();

	return (
		<Layout title="Account Page | Realm Hunter" showSubnav>
			<StyledContainer>
				<h2 className="text-white">
					Artifacts Page.. you are{" "}
					{isAuthenticated ? `signed in` : `not signed in`}
				</h2>
				<hr />
				<h3 className="text-white">
					Here, all of your Artifacts will be displayed
					<hr />
				</h3>

				{/* {isAuthenticated && (
					<p className="text-white">
						Wallet Address:{" "}
						{user.attributes.ethAddress &&
							user.attributes.ethAddress.toUpperCase()}
						<br />
						<hr />
						Linked email:{" "}
						{user.attributes.email ? user.attributes.email : "None"}
					</p>
				)} */}
			</StyledContainer>
		</Layout>
	);
};

export default mustBeAuthed(Artifacts);
