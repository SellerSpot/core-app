import { css } from '@emotion/css';

export const getAppStoreStyles = (): { appstoreWrapper: string } => {
    const appstoreWrapper = css`
        width: 100%;
        height: 100%;
        padding: 0 0 0 5px;
    `;

    return { appstoreWrapper };
};
