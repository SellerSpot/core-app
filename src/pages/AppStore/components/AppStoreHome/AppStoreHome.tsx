import { cx } from '@emotion/css';
import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { installedAppsSelector } from 'store/models/installedApps';
import { animationStyles } from 'styles/animation.styles';
import { IAppResponse } from 'typings/response.types';
import { getAllApps } from './appstorehome.actions';
import styles from './appstorehome.module.scss';

export const AppStoreHome = (): ReactElement => {
    const [apps, setApps] = useState([] as IAppResponse[]);
    const history = useHistory();
    const installedAppsState = useSelector(installedAppsSelector);

    useEffect(() => {
        (async () => {
            setApps(await getAllApps());
        }).call(null);
    }, []);

    return (
        <div
            className={cx(
                styles.appStoreHomeWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <SectionTitle style={{ paddingBottom: 15 }} title={'Latest Apps'} />
            <TilesHolder>
                {apps.map((app, key) => {
                    return (
                        <AppHolder
                            key={key}
                            data={app}
                            type={'app'}
                            installed={installedAppsState.appIds.includes(app._id)}
                            onClick={() => history.push(`${ROUTES.APP_STORE_APP}?id=${app._id}`)}
                        />
                    );
                })}
            </TilesHolder>
        </div>
    );
};
