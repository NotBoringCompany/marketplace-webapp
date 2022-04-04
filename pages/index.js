import { useEffect } from "react";
import { useMoralis } from "react-moralis";

import Image from "react-bootstrap/Image";
import Layout from "components/Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import { HeadingMD } from "components/Typography/Headings";
import MetamaskButton from "components/Buttons/MetamaskButton";
const StyledContainer = styled.video`
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
`;

const ContentContainer = styled.div`
	position: fixed;
	top: 113px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding: 20px;
`;

const StyledHeadingMD = styled(HeadingMD)`
	& span.skinny {
		font-weight: lighter;
	}
	font-size: 38px;
`;

export default function Home() {
	const { isAuthenticated, user, isInitializing } = useMoralis();
	const router = useRouter();
	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		router.push("/nbmons");
	// 	} else {
	// 		router.push("/connect");
	// 	}
	// }, [isAuthenticated]);

	return (
		<Layout>
			{!isInitializing && (
				<StyledContainer loop muted>
					<source
						src="https://uploads-ssl.webflow.com/6186cb7acaa11f0e5fecf726/6186cc609578c419bfb5f681_Realm%20Hunter%20Town-transcode.mp4"
						type="video/mp4"
					/>
				</StyledContainer>
			)}

			<ContentContainer>
				{!isInitializing ? (
					<>
						<Image
							src={"./images/rh_logo2.png"}
							alt="logo"
							width={390}
							height={290}
						/>
						<StyledHeadingMD className="text-white mt-1 mb-4">
							<span className="skinny">
								Genesis NBMon egg minting starts on
							</span>{" "}
							April 22, 4PM UTC
						</StyledHeadingMD>
						{!isAuthenticated && <MetamaskButton big />}
					</>
				) : (
					<Loading />
				)}
			</ContentContainer>
		</Layout>
	);
}
