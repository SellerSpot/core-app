import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { getPosdashboardSettingsStyles } from './posdashboardsettings.styles';

const styles = getPosdashboardSettingsStyles();

export const PosDashboardSettings = (props: IInstalledAppDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            pushBreadCrumbs([
                {
                    icon: ICONS['SETTINGS'],
                    route: `${ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS}`,
                    title: 'Settings',
                },
            ]),
        );
        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);
    return (
        <div className={styles.posDashboardSettingsWrapper}>
            {JSON.stringify(props)}Settings Route
        </div>
    );
};
