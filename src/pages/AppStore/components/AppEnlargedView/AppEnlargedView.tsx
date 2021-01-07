import { cx } from '@emotion/css';
import { Button } from '@sellerspot/universal-components';
import { getAppHolderStyles } from 'components/AppHolder/appholder.styles';
import { Loader } from 'components/Loader/Loader';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { installedAppsSelector, updateInstalledAppsState } from 'store/models/installedApps';
import { IAppResponse, IResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { getAppById, installApp } from './appenlargedview.actions';
import { getEnlargedAppViewStyles } from './appenlargedview.styles';

const styles = getEnlargedAppViewStyles();
const appHolderStylesApp = getAppHolderStyles({ installed: true, type: 'app' });

const AppIcon = (props: { appDetails: IAppResponse }) => {
    const Icon = ICONS[props.appDetails.iconUrl as keyof typeof ICONS];
    return <Icon />;
};

export const AppEnlargedView = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    const [isLoading, setIsLoading] = useState(true);
    const [isInstalling, setIsInstalling] = useState(false);
    const installedAppsState = useSelector(installedAppsSelector);

    useEffect(() => {
        try {
            const appId = query.get('id');
            if (!appId) throw 'Invalid Url';
            (async () => {
                try {
                    const app = await getAppById(appId);
                    if (!app) throw 'Invalid Request';
                    dispatch(
                        pushBreadCrumbs([
                            {
                                icon: ICONS.APP,
                                route: ROUTES.APP_STORE,
                                title: 'Apps',
                            },
                            {
                                icon: ICONS[app.iconUrl as keyof typeof ICONS],
                                route: `${ROUTES.APP_STORE_APP}?id=${app._id}`,
                                title: app.name,
                            },
                        ]),
                    );
                    setAppDetails(app);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    // show notificaiton
                    history.push(ROUTES.APP_STORE);
                }
            }).call(null);
        } catch (error) {
            console.error(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }

        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);

    const handleOnLaunch = () => {
        history.push(`${ROUTES.INSTALLED_APPS_APP}/${appDetails.slug}`);
    };

    const handleOnInstallClick = async (): Promise<void> => {
        setIsInstalling(true);
        setTimeout(async () => {
            const appInstallResponse = await installApp(appDetails._id);
            if (appInstallResponse) {
                dispatch(updateInstalledAppsState({ apps: appInstallResponse }));
                setIsInstalling(false);
                handleOnLaunch();
            } else {
                // show error message with notifieer
                setIsInstalling(false);
                history.push(ROUTES.APP_STORE);
            }
        }, 4000);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className={styles.enlargedAppViewWrapper}>
            <div className={styles.enlargedAppViewContainer}>
                <div className={styles.appviewHeader}>
                    <div className={styles.iconContainer}>
                        <div className={styles.iconHolder}>
                            <AppIcon appDetails={appDetails} />
                        </div>
                    </div>
                    <div className={styles.detailsHolder}>
                        <div className={styles.appTitleHolder}>
                            <div className={styles.appTitle}>{appDetails.name}</div>
                            {installedAppsState.appIds.includes(appDetails._id) && (
                                <div
                                    className={cx(
                                        appHolderStylesApp.holderType,
                                        styles.installationStatus,
                                    )}
                                >
                                    <div className={appHolderStylesApp.holderTypeIcon}>
                                        <ICONS.APP />
                                    </div>
                                    <div className={appHolderStylesApp.holderTypeText}>
                                        Installed
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.appShortDescription}>
                            {appDetails.shortDescription}
                        </div>
                    </div>
                    <div className={styles.appCalltoAction}>
                        <Button
                            onClick={
                                installedAppsState.appIds.includes(appDetails._id)
                                    ? handleOnLaunch
                                    : handleOnInstallClick
                            }
                            status={
                                installedAppsState.appIds.includes(appDetails._id)
                                    ? 'default'
                                    : isInstalling
                                    ? 'disabledLoading'
                                    : 'default'
                            }
                            label={
                                installedAppsState.appIds.includes(appDetails._id)
                                    ? 'Launch'
                                    : isInstalling
                                    ? 'Installing'
                                    : 'Install'
                            }
                            style={{
                                fontWeight: 'bold',
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderRadius: 5,
                                fontSize: 16,
                                color: COLORS['FOREGROUND_WHITE'],
                                backgroundColor: COLORS['APP_COLOR'],
                            }}
                        />
                    </div>
                </div>
                <div className={styles.bannerImageHolder}>
                    <div className={styles.bannerImageWrapper}>
                        {appDetails.bannerImages.map((image, key) => (
                            <div key={key} className={styles.bannerImageContainer}>
                                <img className={styles.bannerImage} src={image} alt="banner" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.longDescriptionWrapper}>{appDetails.longDescription}</div>
            </div>
        </div>
    );
};
