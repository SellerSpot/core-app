import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getAppDashboardLeftNavStyles = (): {
    appDashboardLeftNavWrapper: string;
    logoHolder: string;
    appLogoContainer: string;
    appLogo: string;
    appTitleHolder: string;
    appTitle: string;
    appTitleStatusHolder: string;
    menuHolder: string;
} => {
    const appDashboardLeftNavWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: ${COLORS.BACKGROUND_SECONDARY};
        display: grid;
        grid-template-rows: 90px 1fr 60px;
        user-select: none;
    `;

    const logoHolder = css`
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 20px 10px;
    `;

    const appLogoContainer = css`
        width: 100%;
        height: 100%;
        display: grid;
        align-items: flex-start;
        justify-content: flex-start;
        grid-template-columns: 65px 1fr;
        gap: 15px;
    `;

    const appLogo = css`
        width: 65px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${COLORS.BACKGROUND_PRIMARY};
        font-size: 35px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
    `;

    const appTitleHolder = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    `;

    const appTitle = css`
        font-size: 18px;
        font-weight: bold;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 5px;
    `;

    const appTitleStatusHolder = css`
        font-size: 12px;
        width: 100%;
    `;

    const menuHolder = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    `;

    return {
        appDashboardLeftNavWrapper,
        logoHolder,
        appLogoContainer,
        appLogo,
        appTitleHolder,
        appTitle,
        appTitleStatusHolder,
        menuHolder,
    };
};
