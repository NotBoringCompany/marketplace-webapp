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
 * 
 * @param {string} tier is the web app tier
 * @returns JSX.element
 */
const WebAppTierRequirements = ({tier}) => {
    return (
        <div>
            {tier === "newcomer" ? (
                <div>
                    <RequirementsText className="mt-3">Web app account creation</RequirementsText>
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
            ) : "grandee" ? (
                <div>
                    <RequirementsText className="mt-3">TO DO</RequirementsText>
                </div>
            ) : "No applicable tiers."
            }
        </div>
    )
}

const RequirementsList = styled.ol`

`; 

const RequirementsText = styled(TextNormal)`
	font-size: 16px;
	line-height: 24px;
	color: #fff;
`;

export default WebAppTierRequirements;