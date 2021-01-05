import { ReactElement } from 'react';
import { APP_DASHBOARD_NAMES } from 'config/dashboardNames';
import { PointOfSaleDasboard } from 'pages/InstalledApps/components/InstalledAppDashboard/components/AppDashboards/PointOfSaleDashboard/PointOfSaleDasboard';
import { IInstalledAppDashboardProps } from 'pages/InstalledApps/components/InstalledAppDashboard/components/AppDashboards/installedappdashboard.types';

export class InstalledAppDashboardService {
    private appDashboards: Map<
        keyof typeof APP_DASHBOARD_NAMES,
        (props: IInstalledAppDashboardProps) => ReactElement
    >;
    constructor() {
        this.appDashboards = new Map();
        this.registerAppDashboards();
    }

    private registerAppDashboards() {
        this.appDashboards.set('point-of-sale', PointOfSaleDasboard);
    }

    /**
     *
     * @param appName pass app name exactly as in the database - spaces will be automatically handled inside the function
     */
    public getAppDashobard(appName: string): (props: IInstalledAppDashboardProps) => ReactElement {
        const dashboardName = appName
            ?.toLowerCase()
            .split(' ')
            .join('-') as keyof typeof APP_DASHBOARD_NAMES;

        const dashboard = this.appDashboards.get(dashboardName);

        if (dashboard) {
            return dashboard;
        } else {
            return null;
        }
    }
}
