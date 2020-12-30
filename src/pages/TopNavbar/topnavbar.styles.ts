import { css } from '@emotion/css';
import { COLORS } from 'config/cssVariables';

export const getStyles = (): {
    topNavbarWrapper: string;
    breadCrumbsHolder: string;
    notificationHolder: string;
} => {
    const topNavbarWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: ${COLORS.BACKGROUND_SECONDARY};
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0 10px; */
    `;

    const breadCrumbsHolder = css``;
    const notificationHolder = css``;

    return {
        topNavbarWrapper,
        breadCrumbsHolder,
        notificationHolder,
    };
};
