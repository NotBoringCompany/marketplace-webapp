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

import NewPill from "components/NewPill";

const StyledPillContainer = styled.div`
	margin-top: 16px;
	background: linear-gradient(180deg, #1f1f1f 0%, #272626 100%);
	padding: 32px;
	& > div {
		margin-bottom: 32px;
	}

	& > div > div {
		margin-right: 6px;
		margin-bottom: 12px;
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
				<h2 className="text-white">Fertility</h2>
				<div className="d-flex w-100 mt-3">
					<NewPill pillType="fertility" content="3000" />
				</div>

				<h2 className="text-white">Species</h2>
				<div className="d-flex w-100 mt-3">
					<NewPill pillType="origin" />
					<NewPill pillType="wild" />
					<NewPill pillType="hybrid" />
				</div>

				<h2 className="text-white">Types</h2>
				<div className="d-flex w-100 mt-3 flex-wrap">
					<NewPill pillType="type" content="brawler" />
					<NewPill pillType="type" content="crystal" />
					<NewPill pillType="type" content="earth" />
					<NewPill pillType="type" content="electric" />
					<NewPill pillType="type" content="fire" />
					<NewPill pillType="type" content="frost" />
					<NewPill pillType="type" content="magic" />
					<NewPill pillType="type" content="Nature" />
					<NewPill pillType="type" content="Ordinary" />

					<NewPill pillType="type" content="psychic" />
					<NewPill pillType="type" content="Toxic" />
					<NewPill pillType="type" content="Water" />
					<NewPill pillType="type" content="Wind" />
				</div>

				<h2 className="text-white">Mutations</h2>
				<div className="d-flex w-100 mt-3 flex-wrap">
					<NewPill pillType="mutation" content="brawler" />
					<NewPill pillType="mutation" content="crystal" />
					<NewPill pillType="mutation" content="earth" />
					<NewPill pillType="mutation" content="electric" />
					<NewPill pillType="mutation" content="fire" />
					<NewPill pillType="mutation" content="frost" />
					<NewPill pillType="mutation" content="magic" />
					<NewPill pillType="mutation" content="nature" />
					<NewPill pillType="mutation" content="Ordinary" />
					<NewPill pillType="mutation" content="psychic" />
					<NewPill pillType="mutation" content="Toxic" />
					<NewPill pillType="mutation" content="Water" />
					<NewPill pillType="mutation" content="Wind" />
				</div>

				<h2 className="text-white">Mutations</h2>
				<div className="d-flex w-100 mt-3 flex-wrap">
					<NewPill pillType="rarity" content="common" />
					<NewPill pillType="rarity" content="uncommon" />
					<NewPill pillType="rarity" content="Rare" />
					<NewPill pillType="rarity" content="epic" />
					<NewPill pillType="rarity" content="legendary" />
					<NewPill pillType="rarity" content="mythical" />
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
