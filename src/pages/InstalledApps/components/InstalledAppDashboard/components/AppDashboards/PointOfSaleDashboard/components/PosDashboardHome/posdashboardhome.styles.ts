import { css } from '@emotion/css';

export const getPosdashboardHomeStyles = (): {
    posDashboardHomeWrapper: string;
} => {
    const posDashboardHomeWrapper = css`
        width: 100%;
        height: 100%;
    `;
    return {
        posDashboardHomeWrapper,
    };
};
