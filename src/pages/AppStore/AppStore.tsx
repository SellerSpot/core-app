import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getAppStoreStyles } from './appstore.styles';
const styles = getAppStoreStyles();

export const AppStore = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.APP_STORE,
                    route: ROUTES.APP_STORE,
                    title: 'App Store',
                },
            ]),
        );
    }, []);
    return <div className={styles.appstoreWrapper}>AppStore</div>;
};
