import { css } from '@emotion/css';

export const getAppStoreHomeStyles = (): {
    appStoreHomeWrapper: string;
} => {
    const appStoreHomeWrapper = css`
        width: 100%;
        height: 100%;
        position: relative;
    `;

    return {
        appStoreHomeWrapper,
    };
};
