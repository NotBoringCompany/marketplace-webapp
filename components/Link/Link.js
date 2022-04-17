import React from "react";
import Link from "next/link";
import { TextSecondary } from "components/Typography/Texts";
const LinkCustom = ({ href = "#", text, className, ...props }) => {
	return (
		<Link href={href} className="text-decoration-none">
			<a>
				<TextSecondary className={`d-inline-block ${className}`} {...props}>
					{text}
				</TextSecondary>
			</a>
		</Link>
	);
};

export default LinkCustom;
