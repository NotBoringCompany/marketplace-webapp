import React from 'react'
import TitleWithLink from 'components/Typography/TitleWithLink'
import styled from 'styled-components'
import { mediaBreakpoint } from 'utils/breakpoints'
import Image from 'next/image'

const OverviewInventory = () => {
  return (
    <div className='mt-4'>
        <div className='py-0 px-3'>
            <TitleWithLink
                title='Inventory'
                textLink='Open inventory'
                href='/inventory'
                classesWrap='mb-2'
            />
        </div>

        <ListInventory>
            {/* item */}
            <Item>
                <CardInventoryActive
                    iconSrc='/images/nbmon_icon.png'
                    text='1000 NBMons'
                />
            </Item>

            {/* item */}
            <Item>
                <CardInventorySoon />
            </Item>

            {/* item */}
            <Item>
                <CardInventorySoon />
            </Item>

            {/* item */}
            <Item>
                <CardInventorySoon />
            </Item>
        </ListInventory>
    </div>
  )
}

/**
 * Props:
 * @param string iconSrc
 * @param string text
 * @returns JSX.Element
 */
const CardInventoryActive = ({ iconSrc, text }) => {
    return(
        <CardActiveWrap>
            <Image
                src={iconSrc}
                className='mt-1'
                width={40}
                height={40}
            />

            <TextActive>{text}</TextActive>
        </CardActiveWrap>
    )
}

const CardInventorySoon = () => {
    return(
        <CardSoonWrap>
            <Image
                src='/images/question_mark.svg'
                className='mt-1'
                height={40}
                width={40}
            />

            <TextSoon>Artifacts</TextSoon>

            <BlockComingSoon>
                <span className='text-center d-block w-100'>coming soon</span>
            </BlockComingSoon>
        </CardSoonWrap>
    )
}

const ListInventory = styled.ul`
    list-style: none;
    padding: 0 11px 11px 11px !important;
    margin: 0 !important;
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
`

const Item = styled.div`
    flex: 0 1 auto;
    padding: 0 4px 4px 4px;
    width: 25%;

    @media ${mediaBreakpoint.down.md} {
        width: 50%;
    }

    @media ${mediaBreakpoint.down.sm} {
        width: 100%;
    }
`

const CardActiveWrap = styled.div`
    background: #2C2D2D;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
`

const TextActive = styled.h6`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #FFFFFF;
`

const CardSoonWrap = styled.div`
    background: rgba(44, 45, 45, 0.78);
    opacity: 0.42;
    border-radius: 12px;
    padding: 16px 2.5px 2.5px 2.5px;
    text-align: center;
`

const TextSoon = styled.h6`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #FFFFFF;
`

const BlockComingSoon = styled.div`
    background: #1C1C1C;
    border-radius: 26px;
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 1;
    display: flex;
    letter-spacing: 0.1px;
    color: #A2A2A2;
    padding: 3px 8px;
    margin-top: 4px;
    text-align: center;
`

export default OverviewInventory