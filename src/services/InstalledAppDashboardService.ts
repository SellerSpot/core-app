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
     * @param slug pass app slug exactly as in the database - to get corresponding dashboard
     */
    public getAppDashobard(
        slug: keyof typeof APP_DASHBOARD_NAMES,
    ): (props: IInstalledAppDashboardProps) => ReactElement {
        const dashboard = this.appDashboards.get(slug);

        if (dashboard) {
            return dashboard;
        } else {
            return null;
        }
    }

    /**
     *
     * @param appName app name exactly as same as from the server
     */
    public getDashboardNameFromAppName(appName: string): keyof typeof APP_DASHBOARD_NAMES {
        const dashboardName = appName
            ?.toLowerCase()
            .split(' ')
            .join('-') as keyof typeof APP_DASHBOARD_NAMES;

        return dashboardName;
    }
}
