import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getPosdashboardSettingsStyles = (): {
    posDashboardSettingsWrapper: string;
    settingsContainer: string;
    uninstallContainer: string;
    uninstallLanunchInstruction: string;
    uninstallInstructiontitle: string;
    uninstallLanunchCallToAction: string;
} => {
    const posDashboardSettingsWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    `;
    const settingsContainer = css`
        width: 80%;
        height: auto;
    `;

    const uninstallContainer = css`
        margin-top: 100px;
        padding: 25px 50px;
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

    const uninstallLanunchInstruction = css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 25px;
    `;

    const uninstallInstructiontitle = css`
        font-size: 25px;
    `;

    const uninstallLanunchCallToAction = css`
        width: auto;
        height: auto;
    `;

    return {
        posDashboardSettingsWrapper,
        settingsContainer,
        uninstallContainer,
        uninstallLanunchInstruction,
        uninstallInstructiontitle,
        uninstallLanunchCallToAction,
    };
};
