import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

/**
 * Props:
 * @param string title
 * @param string textLink - optional (will hide when prop empty)
 * @param string href - url of text link
 * @param string classesWrap - class name for wrapper
 * @returns JSX.Element
 */
const TitleWithLink = ({ title, textLink, href = '#', classesWrap }) => {
  return (
    <div className={classesWrap}>
        <Inner>
            <Title>{title}</Title>

            {textLink && (<LinkWrap>
                <Link href={href}>
                    <TextLink>{textLink}</TextLink>
                </Link>
            </LinkWrap>)}
        </Inner>
    </div>
  )
}

const Inner = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
`

 const Title = styled.h2`
    flex: 0 1 auto;
    font-family: 'Mada';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
    color: #E1E3E0;
    margin: 0;
 `

 const LinkWrap = styled.div`
    flex: 0 1 auto;
    padding-left: 4px;
 `

 const TextLink = styled.a`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #67DBB1 !important;
    cursor: pointer;
 `

export default TitleWithLink