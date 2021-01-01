import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getSettingsStyles } from './settings.styles';
const styles = getSettingsStyles();

export const Settings = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.SETTINGS,
                    route: ROUTES.SETTINGS,
                    title: 'Settings',
                },
            ]),
        );
    }, []);
    return <div className={styles.settingsWrapper}>Settings</div>;
};
