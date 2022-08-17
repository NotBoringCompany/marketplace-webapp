import {useState, React} from "react";
import styled from "styled-components";
import TitleWithLink from "components/Typography/TitleWithLink";
import { mediaBreakpoint } from "utils/breakpoints";
import Image from "next/image";
import { TextSecondary, TextPrimary, TextNormal } from "components/Typography/Texts";
import { StatsText } from "components/NBMonLargeCard/TabItemComponents";
import Link from "next/link";
import { HeadingSuperXXS } from "components/typography/Headings";

import InputGroup from "react-bootstrap/InputGroup";
import {FormControl, FormGroup} from "react-bootstrap/FormControl";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import axios from "axios";

/**
 * This function checks the requirement to level up to the next tier. If the user is already a magnate, it will show
 * that it's the highest tier.
 * @param {string} tier is the web app tier
 * @returns JSX.element
 */
 const NextWebAppTierRequirements = ({tier}) => {
    return (
        <div>
            {tier === "newcomer" ? (
                <div>
                    <RequirementsText className="mt-3">At least 3 NFTs of any kind owned</RequirementsText>
                    <CenteredDiv className="mt-3">
                        <OrText>OR</OrText>
                    </CenteredDiv>
                    <RequirementsText className="mt-3">At least 300 REC held in current wallet OR</RequirementsText>
                    <CenteredDiv className="mt-3">
                        <OrText>OR</OrText>
                    </CenteredDiv>
                    <RequirementsText className="mt-3">At least 400 REC deposited for xREC</RequirementsText>
                </div>
            ) : "rustic" ? (
                <div>
                    <RequirementsText className="mt-3">TO DO</RequirementsText>
                </div>
            ) : "merchant" ? (
                <div>
                    <RequirementsText className="mt-3">TO DO</RequirementsText>
                </div>
            ) : "tycoon" ? (
                <div>
                    <RequirementsText className="mt-3">TO DO</RequirementsText>
                </div>
            ) : "magnate" ? (
                <div>
                    <RequirementsText className="mt-3">TO DO</RequirementsText>
                </div>
            ) : "You are already at the highest tier."}
        </div>
    )
}


const RequirementsText = styled(TextNormal)`
	font-size: 16px;
	line-height: 24px;
	color: #fff;
`;

const CenteredDiv = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    background: #242424;
`;

const OrText = styled(TextNormal)`
	font-weight: 300;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.5px;
	color: #67dbb1;
`;

export default NextWebAppTierRequirements;