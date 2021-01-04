import { css } from '@emotion/css';

export const getInstalledAppsHomeStyles = (): { installedAppsHomeWrapper: string } => {
    const installedAppsHomeWrapper = css`
        width: 100%;
        height: auto;
    `;

    return {
        installedAppsHomeWrapper,
    };
};
