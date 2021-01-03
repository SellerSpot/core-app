import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { IAppResponse } from 'typings/request.types';
import { ICONS } from 'utilities/icons';
import { getAllApps } from './appstore.actions';
import { getAppStoreStyles } from './appstore.styles';
const styles = getAppStoreStyles();

export const AppStore = (): ReactElement => {
    const dispatch = useDispatch();
    const [apps, setApps] = useState([]);
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
        (async () => {
            setApps((await getAllApps()).data as IAppResponse[]);
        }).call(null);
    }, []);

    return (
        <div className={styles.appstoreWrapper}>
            <SectionTitle style={{ paddingBottom: 15 }} title={'Latest Apps'} />
            <TilesHolder>
                {apps.map((app, key) => (
                    <AppHolder key={key} data={app} />
                ))}
            </TilesHolder>
        </div>
    );
};
