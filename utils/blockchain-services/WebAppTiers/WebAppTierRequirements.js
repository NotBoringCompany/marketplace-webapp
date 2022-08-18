import {React} from "react";
import styled from "styled-components";
import { TextNormal } from "components/Typography/Texts";


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