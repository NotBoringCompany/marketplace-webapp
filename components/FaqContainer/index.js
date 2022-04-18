import Image from 'next/image'
import React from 'react'
import { Accordion } from 'react-bootstrap'
import { Element } from 'react-scroll'
import styled from 'styled-components'
import AccordionCustom from './AccordionCustom'
import TextScrollTo from './TextScrollTo'
import TitleFaqList from './TitleFaqList'

const FaqContainer = () => {
  return (
    <Wrapper className='px-3 mx-auto'>
        <FaqHeader>
            <Image
                src='/images/logo.png'
                width={69.29}
                height={77.12}
            />

            <HeaderDetail>
                <TitleHeader>FAQ</TitleHeader>

                <DescriptionHeader>
                    Note: Most of the questions below will redirect you to the Litepaper since we have most of the questions answered there. For the ones that haven’t been added, we will answer it below.
                </DescriptionHeader>
            </HeaderDetail>
        </FaqHeader>

        <NavigationFaq>
            <TitleNav>Quick Access</TitleNav>

            <ListNav>
                <Item>
                    <TextScrollTo
                        text='Product'
                        to='product'
                        duration={100}
                    />
                </Item>

                <Item>
                    <TextScrollTo
                        text='Realm Hunter'
                        to='realm'
                        duration={100}
                    />
                </Item>

                <Item>
                    <TextScrollTo
                        text='NBMons'
                        to='nbmon'
                        duration={100}
                    />
                </Item>
            </ListNav>
        </NavigationFaq>

        <FaqContent>
            <Element name='product' className='mb-5 element'>
                <TitleFaqList>Product FAQ</TitleFaqList>

                <Accordion defaultActiveKey='0'>
                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='0'
                        title='What is Not Boring Company?'
                        description='Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />

                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='1'
                        title='What is Realm Hunter?'
                        description='Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />
                </Accordion>
            </Element>

            <Element name='realm' className='mb-5 element'>
                <TitleFaqList>Realm Hunter FAQ</TitleFaqList>

                <Accordion defaultActiveKey='0'>
                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='0'
                        title='What can you do in Realm Hunter?'
                        description='Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />

                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='1'
                        title='What kinds of Realms are there?'
                        description='Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />
                </Accordion>
            </Element>

            <Element name='nbmon' className='mb-5 element'>
                <TitleFaqList>NBMon FAQ</TitleFaqList>

                <Accordion defaultActiveKey='0'>
                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='0'
                        title='What are NBMons?'
                        description='hich is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />

                    <AccordionCustom
                        classesWrap='mb-3'
                        eventKey='1'
                        title='How many NBMons will there be on the first release?'
                        description='Not Boring Company is a Metaverse startup, intending to become the Disney of Web3 by developing our IPs and franchise over a global scale and aiming to build the NBVerse - which is our version of a hyper second reality - where 1 billion people can live, work and play over the next few decades.'
                    />
                </Accordion>
            </Element>
        </FaqContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    max-width: 552px;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 80px;
`

const FaqHeader = styled.div`
    text-align: center;
`

const HeaderDetail = styled.div`
    text-align: left;
    margin-top: 48px;
    margin-bottom: 48px;
`

const TitleHeader = styled.h2`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    color: #41B995;
    margin-bottom: 13px;
    text-align: left;
`

const DescriptionHeader = styled.p`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.1px;
    color: #BFC9C2;
`

const NavigationFaq = styled.div`
`

const TitleNav = styled.h5`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #BFC9C2;
    margin-bottom: 20px;
    text-align: center;
`

const ListNav = styled.ul`
    list-style: none;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

const Item = styled.li`
    flex: 0 1 auto;
    padding: 0 15px 8px 15px;
`

const FaqContent = styled.div`
    margin-top: 48px;
`

export default FaqContainer