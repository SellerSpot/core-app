import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { getPosdashboardHomeStyles } from './posdashboardhome.styles';

const styles = getPosdashboardHomeStyles();

export const PosDashboardHome = (props: IInstalledAppDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            pushBreadCrumbs([
                {
                    icon: ICONS['HOME'],
                    route: `${ROUTES.INSTALLED_APP_POINT_OF_SALE_HOME}`,
                    title: 'Home',
                },
            ]),
        );
        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);
    return <div className={styles.posDashboardHomeWrapper}>Home Route</div>;
};
