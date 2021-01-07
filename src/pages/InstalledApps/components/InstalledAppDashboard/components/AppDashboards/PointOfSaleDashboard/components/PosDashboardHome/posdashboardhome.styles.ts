import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getPosdashboardHomeStyles = (): {
    posDashboardHomeWrapper: string;
    homeContainer: string;
    welcomeContainer: string;
    welcomeContainerLanunchInstruction: string;
    welcomeInstructiontitle: string;
    welcomeInstructionLinkHolder: string;
    welcomeInstructionLink: string;
    welcomeContainerLanunchCallToAction: string;
} => {
    const posDashboardHomeWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    `;
    const homeContainer = css`
        width: 80%;
        height: auto;
    `;

    const welcomeContainer = css`
        padding: 50px;
        width: 100%;
        height: auto;
        box-shadow: 0 0 5px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
    `;

    const welcomeContainerLanunchInstruction = css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 25px;
    `;

    const welcomeInstructiontitle = css`
        font-size: 25px;
    `;

    const welcomeInstructionLinkHolder = css`
        width: auto;
        height: auto;
    `;

    const welcomeInstructionLink = css`
        font-size: 25px;
    `;

    const welcomeContainerLanunchCallToAction = css`
        width: auto;
        height: auto;
    `;

    return {
        posDashboardHomeWrapper,
        homeContainer,
        welcomeContainer,
        welcomeContainerLanunchInstruction,
        welcomeInstructiontitle,
        welcomeInstructionLinkHolder,
        welcomeInstructionLink,
        welcomeContainerLanunchCallToAction,
    };
};
