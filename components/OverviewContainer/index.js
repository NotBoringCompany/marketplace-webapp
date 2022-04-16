import React from 'react'
import styled from 'styled-components'
import OverviewInventory from './OverviewInventory'
import OverviewWallet from './OverviewWallet'
import OverviewActivies from './OverviewActivies'

const OverviewContainer = () => {
  return (
    <Wrapper>
        <OverviewWallet
            addressEth='0xD8A64bE6e5348a7Fa6028dBB208F84A49b84c0b6'
            totalBtc={0.9}
            totalBtcUsd='$ 450'
            totalEth1={0.23}
            totalEthUsd1='$ 490'
            totalEth2={0.23}
            totalEthUsd2='$ 600'
        />

        <OverviewInventory />

        <OverviewActivies />
    </Wrapper>
  )
}

const Wrapper = styled.div`
    max-width: 648px;
    width: 100%;
    margin: 92px auto;
    padding: 0;
`

export default OverviewContainer