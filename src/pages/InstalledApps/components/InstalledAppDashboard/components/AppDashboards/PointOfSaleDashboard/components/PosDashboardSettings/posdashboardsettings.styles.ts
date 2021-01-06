import { css } from '@emotion/css';

export const getPosdashboardSettingsStyles = (): {
    posDashboardSettingsWrapper: string;
} => {
    const posDashboardSettingsWrapper = css`
        width: 100%;
        height: 100%;
    `;
    return {
        posDashboardSettingsWrapper,
    };
};
