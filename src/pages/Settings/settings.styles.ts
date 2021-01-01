import { css } from '@emotion/css';

export const getSettingsStyles = (): { settingsWrapper: string } => {
    const settingsWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { settingsWrapper };
};
