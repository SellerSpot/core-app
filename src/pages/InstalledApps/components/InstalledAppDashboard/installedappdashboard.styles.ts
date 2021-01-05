import { css } from '@emotion/css';
import { InstalledAppDashboard } from './InstalledAppDashboard';

export const getInstalledAppDashboardStyle = (): {
    installedAppDashboardWrapper: string;
} => {
    const installedAppDashboardWrapper = css`
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    `;

    return {
        installedAppDashboardWrapper,
    };
};
