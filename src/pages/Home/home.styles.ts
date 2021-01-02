import { css, cx } from '@emotion/css';

export const getHomeStyles = (): { homeWrapper: string } => {
    const homeWrapper = css`
        width: 100%;
        height: 100%;
        padding: 0 0 0 5px;
    `;

    return {
        homeWrapper,
    };
};
