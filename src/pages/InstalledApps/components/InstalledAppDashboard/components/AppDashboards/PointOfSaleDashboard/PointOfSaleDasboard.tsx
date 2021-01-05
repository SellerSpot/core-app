import React, { ReactElement } from 'react';
import { IAppResponse } from 'typings/response.types';
import { IInstalledAppDashboardProps } from '../installedappdashboard.types';
import { getPointOfSaleDashboardStyles } from './pointofsaledashboard.styles';
const styles = getPointOfSaleDashboardStyles();

export const PointOfSaleDasboard = (props: IInstalledAppDashboardProps): ReactElement => {
    return (
        <div className={styles.pointOfSaleDashboardWrappper}>
            Point of sale dashboard <pre>{JSON.stringify(props.data, null, 4)}</pre>
        </div>
    );
};
