import { css } from '@emotion/css';

export const getAppStoreStyles = (): { appstoreWrapper: string } => {
    const appstoreWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { appstoreWrapper };
};
