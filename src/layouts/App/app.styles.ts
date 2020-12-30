import { css } from '@emotion/css';

export const getAppStyles = (): {
    appWrapper: string;
    appContainer: string;
} => {
    const appWrapper = css`
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: hidden;
    `;
    const appContainer = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    `;

    return {
        appContainer,
        appWrapper,
    };
};
