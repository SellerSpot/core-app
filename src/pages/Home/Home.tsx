import { cx } from '@emotion/css';
import { AppHolder } from 'components/AppHolder/AppHolder';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { Space } from 'components/Space/Space';
import { TilesHolder } from 'components/TilesHolder/TilesHolder';
import { ROUTES } from 'config/routes';
import { getAllApps } from 'pages/AppStore/components/AppStoreHome/appstorehome.actions';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    clearAndPushBreadCrumbs,
    removePreviouslyInsertedBreadCrumbs,
} from 'store/models/breadCrumb';
import { installedAppsSelector } from 'store/models/installedApps';
import { animationStyles } from 'styles/animation.styles';
import { IAppResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import styles from './home.module.scss';

export const Home = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [latestApps, setLatestApps] = useState([] as IAppResponse[]);
    const installedAppsState = useSelector(installedAppsSelector);

    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.HOME,
                    route: ROUTES.HOME,
                    title: 'Home',
                },
            ]),
        );
        (async () => {
            setLatestApps(await getAllApps());
        }).call(null);
        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);

    return (
        <div
            className={cx(
                styles.homeWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <SectionTitle style={{ paddingBottom: 15 }} title={'Installed Apps'} />
            <TilesHolder>
                <>
                    {installedAppsState.apps.length > 0 &&
                        installedAppsState.apps.map((app, key) => {
                            return (
                                <AppHolder
                                    key={key}
                                    data={app}
                                    type={'app'}
                                    installed={true}
                                    onClick={() =>
                                        history.push(`${ROUTES.INSTALLED_APPS_APP}/${app.slug}`)
                                    }
                                />
                            );
                        })}

                    {/* install app call to action */}
                    {installedAppsState.apps.length === 0 && <AppHolder showBadge={false} />}
                </>
            </TilesHolder>
            <Space size={20} />
            <SectionTitle style={{ paddingBottom: 15 }} title={'Latest Apps'} />
            <TilesHolder>
                {latestApps.map((app, key) => {
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
