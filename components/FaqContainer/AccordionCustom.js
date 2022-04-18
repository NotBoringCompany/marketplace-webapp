import React from "react";
import { Accordion } from "react-bootstrap";
import Linkify from "react-linkify";

/**
 * Props:
 * @param string eventKey
 * @param string title
 * @param string description
 * @param string classesWrap
 * @returns JSX.Element
 * using react-bootstrap
 */
const AccordionCustom = ({ eventKey, title, description, classesWrap }) => {
	return (
		<Accordion.Item eventKey={eventKey} className={classesWrap}>
			<Accordion.Header>{title}</Accordion.Header>
			<Accordion.Body>
				<pre>
					<Linkify
						componentDecorator={(decoratedHref, decoratedText, key) => (
							<a target="blank" href={decoratedHref} key={key}>
								{decoratedText}
							</a>
						)}
					>
						{description}
					</Linkify>
				</pre>
			</Accordion.Body>
		</Accordion.Item>
	);
};

export default AccordionCustom;
