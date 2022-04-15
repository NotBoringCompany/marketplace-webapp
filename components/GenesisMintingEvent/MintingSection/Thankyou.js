import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { BlurContainer } from "components/BlurContainer";
import { mediaBreakpoint } from "utils/breakpoints";
import { HeadingLG, Heading18 } from "components/Typography/Headings";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import DiscordLogo from "components/../public/images/discord.svg";
import TwitterLogo from "components/../public/images/twitter.svg";
const StyledBlurContainer = styled(BlurContainer)`
	border-radius: 12px;
	padding: 14px 56px;
	backdrop-filter: blur(4.5px);
	background: #41b995;
	width: 600px;
	max-width: 80%;
	align-items: center;
	@media ${mediaBreakpoint.down.xl} {
		padding: 16px;
	}

	@media ${mediaBreakpoint.down.md} {
		& .heading {
			font-size: 32px;
		}
	}
`;
const Thankyou = () => {
	return (
		<div className="d-flex flex-column align-items-center">
			<StyledBlurContainer className="mt-3 text-white text-center">
				<HeadingLG as="p" className="heading">
					THANK YOU
				</HeadingLG>
				<TextPrimary className="mt-1">to everyone who participated</TextPrimary>
			</StyledBlurContainer>
			<BlurContainer className="mt-4">
				<Heading18 as="p" className="text-white">
					Follow Realm Hunter for updates
				</Heading18>

				<div className="d-flex flex-column mt-2 text-white">
					<div className="d-flex align-items-center w-100">
						<Image
							src={TwitterLogo}
							width={20}
							height={20}
							alt="Twitter Logo"
						/>
						<a
							href="https://twitter.com/realmhunterio"
							target="_blank"
							className="ms-3 text-white"
							rel="noopener noreferrer"
						>
							<TextSecondary>@RealmHunterio</TextSecondary>
						</a>
					</div>

					<div className="d-flex align-items-center w-100 mt-2">
						<Image
							src={DiscordLogo}
							width={20}
							height={20}
							alt="Discord Logo"
						/>
						<a
							href="https://twitter.com/realmhunterio"
							target="_blank"
							className="ms-3 text-white"
							rel="noopener noreferrer"
						>
							<TextSecondary>Discord Link</TextSecondary>
						</a>
					</div>
				</div>
			</BlurContainer>
		</div>
	);
};

export default Thankyou;
