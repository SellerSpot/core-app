import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getDashboardStyles = (): {
    dashboardWrapper: string;
    leftNavbarWrapper: string;
    mainBodyWrapper: string;
    topNavbarWrapper: string;
    coreContentWrapper: string;
} => {
    const dashboardWrapper = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 250px 1fr;
        background: ${COLORS.BACKGROUND_PRIMARY};
        overflow: hidden;
    `;

    const leftNavbarWrapper = css`
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
    `;

    const mainBodyWrapper = css`
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: auto;
        position: relative;
        padding: 10px 0px 10px 10px;
        display: grid;
        grid-template-rows: 50px 1fr;
        gap: 5px;
    `;

    const topNavbarWrapper = css`
        width: 100%;
        height: 100%;
    `;

    const coreContentWrapper = css`
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: auto;
        position: relative;
    `;

    return {
        dashboardWrapper,
        leftNavbarWrapper,
        mainBodyWrapper,
        topNavbarWrapper,
        coreContentWrapper,
    };
};
