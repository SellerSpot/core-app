import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

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
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

    const breadCrumbsHolder = css`
        width: auto;
    `;

    const notificationHolder = css`
        width: auto;
    `;

    return {
        topNavbarWrapper,
        breadCrumbsHolder,
        notificationHolder,
    };
};
