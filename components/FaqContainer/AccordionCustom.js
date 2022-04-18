import React from 'react'
import { Accordion } from 'react-bootstrap'

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
            {description}
        </Accordion.Body>
    </Accordion.Item>
  )
}

export default AccordionCustom