import { css } from '@emotion/css';

export const getInstalledAppsStyles = (): { installedAppsWrapper: string } => {
    const installedAppsWrapper = css`
        width: 100%;
        height: 100%;
        padding: 0 0 0 5px;
    `;

    return { installedAppsWrapper };
};
