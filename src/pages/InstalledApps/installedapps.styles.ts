import { css } from '@emotion/css';

export const getInstalledAppsStyles = (): { installedAppsWrapper: string } => {
    const installedAppsWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { installedAppsWrapper };
};
