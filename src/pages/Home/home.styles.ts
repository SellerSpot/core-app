import { css, cx } from '@emotion/css';

export const getHomeStyles = (): { homeWrapper: string } => {
    const homeWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return {
        homeWrapper,
    };
};
