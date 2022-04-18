import React from 'react'
import { Link } from 'react-scroll'
import styled from 'styled-components'

/**
 * Props:
 * @param string text
 * @param string to - name of element
 * @param number duration - duration scroll (default 500) 
 * @returns JSX.Element
 * this is using react-scroll, more detail on https://www.npmjs.com/package/react-scroll
 */
const TextScrollTo = ({
    text,
    to,
    duration = 500
}) => {
  return (
    <TextScroll>
        <Link
            to={to}
            spy={true}
            smooth={true}
            duration={duration}
            activeClass='active'
            className='text-scroll-to'
        >
            {text}
        </Link>
    </TextScroll>
  )
}

const TextScroll = styled.span`

`

export default TextScrollTo