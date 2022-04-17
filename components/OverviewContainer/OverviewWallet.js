import React from 'react'
import styled from 'styled-components'
import TitleWithLink from 'components/Typography/TitleWithLink'
import { mediaBreakpoint } from 'utils/breakpoints'
import Image from 'next/image'

/**
 * Props:
 * @param string addressEth
 * @param number totalBtc
 * @param string totalBtcUsd
 * @param number totalEth1
 * @param string totalEthUsd1
 * @param number totalEth2
 * @param string totalEthUsd2
 * @returns JSX.Element
 */
const OverviewWallet = ({
    addressEth,
    totalBtc,
    totalBtcUsd,
    totalEth1,
    totalEthUsd1,
    totalEth2,
    totalEthUsd2
}) => {
  return (
    <div className='py-0 px-3'>
        <TitleWithLink
            title='Wallet'
            classesWrap='mb-2'
        />

        <CardOverview>
            <AddressWrap>
                <ImageWrap>
                    <Image
                        src='/images/overview-eth-address.svg'
                        width={28.04}
                        height={44}
                    />
                </ImageWrap>

                <AddressContent>
                    <AddressTitle>Ethereum Address</AddressTitle>

                    <CopyAddress>
                        <AddressText>{addressEth}</AddressText>

                        <ButtonCopy
                            onClick={() => navigator.clipboard.writeText(addressEth)}
                        >
                            <Image
                                src='/images/copy_all.svg'
                                height={24}
                                width={24}
                            />
                        </ButtonCopy>
                    </CopyAddress>
                </AddressContent>
            </AddressWrap>

            <ListCrypto>
                {/* item */}
                <CryptoItem>
                    <CryptoIcon>
                        <Image
                            src='/images/Bitcoin.svg'
                            width={28}
                            height={28}
                        />
                    </CryptoIcon>

                    <CryptoDetail>
                        <TextTotalCrypto>{totalBtc}</TextTotalCrypto>
                        <TextUsd>{totalBtcUsd}</TextUsd>
                    </CryptoDetail>
                </CryptoItem>

                {/* item */}
                <CryptoItem>
                    <CryptoIcon>
                        <Image
                            src='/images/Ethereum.svg'
                            width={30}
                            height={30}
                        />
                    </CryptoIcon>

                    <CryptoDetail>
                        <TextTotalCrypto>{totalEth1}</TextTotalCrypto>
                        <TextUsd>{totalEthUsd1}</TextUsd>
                    </CryptoDetail>
                </CryptoItem>

                {/* item */}
                <CryptoItem>
                    <CryptoIcon>
                        <Image
                            src='/images/Ethereum.svg'
                            width={30}
                            height={30}
                        />
                    </CryptoIcon>

                    <CryptoDetail>
                        <TextTotalCrypto>{totalEth2}</TextTotalCrypto>
                        <TextUsd>{totalEthUsd2}</TextUsd>
                    </CryptoDetail>
                </CryptoItem>
            </ListCrypto>
        </CardOverview>
    </div>
  )
}

const CardOverview = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background: #242424;
    border-radius: 12px;
    padding: 33px 40px;

    @media${mediaBreakpoint.down.md} {
        flex-flow: column nowrap;
        align-items: flex-start;
        padding: 25px 25px;
    }
`

const AddressWrap = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-flow: row nowrap;

    @media${mediaBreakpoint.down.md} {
        margin-bottom: 20px;
    }
`

const ImageWrap = styled.div`
    flex: 0 1 auto;
    padding-right: 18px;
`

const AddressTitle = styled.div`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #FFFFFF;
    margin-bottom: 0;
`

const AddressContent = styled.div`
    flex: 0 1 auto;
`

const CopyAddress = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
`

const AddressText = styled.span`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #404944;
    max-width: 208px;
    width: 100%;
    overflow-x: hidden;
    margin-right: 11.5px;
    display: block;
`

const ListCrypto = styled.ul`
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    flex-flow: row nowrap;
`

const CryptoItem = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: 5px;
    align-items: center;
`

const CryptoIcon = styled.div`
    flex: 0 1 auto;
`

const CryptoDetail = styled.div`
    flex: 0 1 auto;
    padding-left: 4px;
`

const TextTotalCrypto = styled.span`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 1;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    display: block;
`

const TextUsd = styled.span`
    font-family: 'Mada';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 1;
    display: flex;
    align-items: center;
    text-align: right;
    color: #AFAFAF;
    display: block;
`

const ButtonCopy = styled.button`
    background: transparent;
    padding: 0;
    margin: 0;
    width: 24px;
    height: 24px;
    border: none;
`

export default OverviewWallet