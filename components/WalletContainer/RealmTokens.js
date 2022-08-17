import {useState, React} from "react";
import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { TextSecondary } from "components/Typography/Texts";
import { StatsText } from "components/NBMonLargeCard/TabItemComponents";

const RealmTokens = ({ loading = false, recOwned = 0, resOwned = 0, xrecOwned = 0, xresOwned = 0, ...props }) => {
    const {
        setTokenContainer,
        showClaimContainer,
        setShowClaimContainer,
        showDepositContainer,
        setShowDepositContainer,
        // tokenName, 
        setTokenName,
    } = props;

    return (
        <div className="mt-4">
            <div className="py-0 px-3 mb-2">
                <TitleWithLink title="Realm IP Tokens" />
            </div>
                <ListTokens>
                    {/* <Token>
                        <ActiveTokensWrap>
                            <Image
                            src="/images/lx.png"
                            className="mt-1"
                            width={38}
                            height={40}
                            alt="Image"
                            />
                            <TextActive className="mt-1">{loading ? `...` : `${recOwned} REC`}</TextActive>
                            <DepositButton onClick={() => {
                                setShowDepositTokens(!showDepositTokens);
                                setTokenName("REC");
                            }}>Deposit</DepositButton>
                        </ActiveTokensWrap>
                    </Token> */}
                    <Token>
                        <ActiveTokensWrap>
                            <Image
                            src="/images/lx.png"
                            className="mt-1"
                            width={38}
                            height={40}
                            alt="Image"
                            />
                            <TextActive className="mt-1">{loading ? `...` : `${resOwned} RES`}</TextActive>
                            <DepositButton onClick={() => {
                                setTokenContainer("Deposit");
                                setShowDepositContainer(!showDepositContainer);
                                setShowClaimContainer(false);
                                setTokenName("RES");
                            }}>Deposit</DepositButton>
                        </ActiveTokensWrap>
                    </Token>
                    <Token>
                        <ActiveTokensWrap>
                            <Image
                            src="/images/lx.png"
                            className="mt-1"
                            width={38}
                            height={40}
                            alt="Image"
                            />
                            <TextActive className="mt-1">{loading ? `...` : `${xresOwned} xRES`}</TextActive>
                            <DepositButton onClick={() => {
                                setTokenContainer("Claim");
                                setShowClaimContainer(!showClaimContainer);
                                setShowDepositContainer(false);
                                setTokenName("xRES");
                            }}>Claim</DepositButton>
                        </ActiveTokensWrap>
                    </Token>
                    
                    {/* <Token>
                        <ActiveTokensWithClaim 
                            iconSrc="/images/lx.png"
                            text={loading ? `...` : `${xrecOwned} xREC`}
                        />
                    </Token> */}
                    <Token>
                        {/* <ActiveTokensWithClaim  
                            iconSrc="/images/lx.png"
                            text={loading ? `...` : `${xresOwned} xRES`}
                        /> */}
                    </Token>
                </ListTokens>
        </div>
    );
};

const ListTokens = styled.ul`
    list-style: none;
    padding: 0 11px 11px 11px !important;
    margin: 0 !important;
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
`;

const DepositButton = styled.button`
	padding: 10px 16px;
	position: static;
	left: 0%;
	right: 0%;
	top: 0%;
	bottom: 0%;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.2)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 100px;
	border: none;
	width: 100%;
	font-family: "Lexend";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #bfc9c2;
    &:hover {
        color: white
    };
`;

const Token = styled.div`
	flex: 0 1 auto;
	padding: 0 4px 4px 4px;
	width: 25%;

	@media ${mediaBreakpoint.down.md} {
		width: 50%;
	}

	@media ${mediaBreakpoint.down.sm} {
		width: 100%;
	}
`;

const ActiveTokensWrap = styled.div`
	background: #2c2d2d;
	border-radius: 12px;
	padding: 16px;
	text-align: center;
`;

const TextActive = styled(TextSecondary)`
	font-weight: 500;
	font-size: 16px;
	line-height: 16px;
	letter-spacing: 0.5px;
	padding-bottom: 8px;
	color: #ffffff;
`;

export default RealmTokens;