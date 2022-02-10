import React from "react";
import Button from "components/Buttons/Button";
import {
	HeadingXL,
	HeadingLG,
	HeadingMD,
	HeadingSM,
	HeadingXXS,
} from "../components/Typography/Headings";
import Link from "next/link";

import { TextPrimary, TextSecondary } from "../components/Typography/Texts";
import TextInput from "components/FormInputs/TextInput";

const Stylesheet = () => {
	return (
		<div className="container my-4">
			<h1>
				<kbd>Dev</kbd> only page for stylesheet. Here you can find all of our{" "}
				<u>reusable</u> custom components created specifically for this app.
			</h1>

			<p>
				What is a reusable component? In short, it's a component that we are
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

			<Link href="/">
				<a>
					<TextSecondary className="d-inline-block text-secondary">
						<u>Forgot Password?</u>
					</TextSecondary>
				</a>
			</Link>
			<br />
			<Link href="/">
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
