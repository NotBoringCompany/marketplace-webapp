import React from "react";
import Button from "components/Buttons/Button";
import {
	HeadingXL,
	HeadingLG,
	HeadingMD,
	HeadingSM,
	HeadingXXS,
} from "components/Typography/Headings";
import Link from "next/link";

import Pill from "components/Pill";

import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import TextInput from "components/FormInputs/TextInput";
import styled from "styled-components";

const StyledPillContainer = styled.div`
	margin-top: 16px;
	background: linear-gradient(180deg, #1f1f1f 0%, #272626 100%);
	padding: 32px;
	& > div {
		margin-bottom: 32px;
	}
`;

const Stylesheet = () => {
	return (
		<div className="bg-white container my-4">
			<h1>
				<kbd>Dev</kbd> only page for stylesheet. Here you can find all of our{" "}
				<u>reusable</u> custom components created specifically for this app.
			</h1>

			<p>
				What is a reusable component? In short, it is a component that we are
				using / potentially use multiple times in our design.
			</p>
			<hr className="my-5" />
			<HeadingXL>HeadingXL</HeadingXL>
			<HeadingLG>HeadingLG</HeadingLG>
			<HeadingMD>HeadingMD</HeadingMD>
			<HeadingSM>HeadingSM</HeadingSM>
			<HeadingXXS>HeadingXXS</HeadingXXS>
			<hr className="my-5" />
			<TextPrimary>TextPrimary</TextPrimary>
			<TextSecondary>TextSecondary</TextSecondary>

			<hr className="my-5" />

			<StyledPillContainer className="text-white d-flex flex-column flex-wrap">
				<h2 className="text-white">Species</h2>
				<div className="d-flex w-100 mt-3">
					<Pill content={"origin"} /> <Pill content={"hybrid"} />{" "}
					<Pill content={"wild"} />
				</div>
				<h2 className="text-white">Rarity</h2>
				<div className="d-flex w-100">
					<Pill content={"common"} />
					<Pill content={"uncommon"} />
					<Pill content={"rare"} />
					<Pill content={"epic"} />
					<Pill content={"legendary"} />
					<Pill content={"mythical"} />
				</div>
				<h2 className="text-white">Mutation Status</h2>
				<div className="d-flex w-100">
					<Pill content={"mutated"} />
					<Pill content={"not mutated"} />
				</div>
			</StyledPillContainer>
			<hr className="my-5" />

			<TextInput
				placeholder="Email (Dark Variant)"
				type="email"
				variant="dark"
				className="mb-4"
			/>
			<TextInput
				placeholder="Other inputs, such as password (Light variant is also available)"
				type="password"
				className="mb-4"
			/>

			<Link href="#">
				<a>
					<TextSecondary className="d-inline-block text-secondary">
						<u>Forgot Password?</u>
					</TextSecondary>
				</a>
			</Link>
			<br />
			<Link href="#">
				<a>
					<TextSecondary className="d-inline-block text-gray">
						<u>Another Link</u>
					</TextSecondary>
				</a>
			</Link>
			<hr className="my-5" />

			<div className="d-flex flex-column">
				<Button text={"Connect Wallet"} variant="secondary" />
				<div className="my-2"></div>
				<Button text={"Connect Wallet"} variant="outline-secondary" />
			</div>
		</div>
	);
};

export default Stylesheet;
