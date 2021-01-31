import { cx } from '@emotion/css';
import { Button } from '@sellerspot/universal-components';
import { Loader } from 'components/Loader/Loader';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { installedAppsSelector, updateInstalledAppsState } from 'store/models/installedApps';
import { subDomainSelector } from 'store/models/subDomain';
import { animationStyles } from 'styles/animation.styles';
import { IAppResponse, IResponse } from 'typings/response.types';
import { introduceDelay } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import { showMessage } from 'utilities/notify';
import { getAppById, installApp } from './appenlargedview.actions';
import styles from './appenlargedview.module.scss';
import appHolderStyles from '../../../../components/AppHolder/appholder.module.scss';

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
    const sudDomainState = useSelector(subDomainSelector);

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
                    showMessage(error.message ?? `${error}`, 'danger');
                    // show notificaiton
                    history.push(ROUTES.APP_STORE);
                }
            }).call(null);
        } catch (error) {
            showMessage(error.message ?? `${error}`, 'danger');
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
        if (!sudDomainState.registered) {
            showMessage('Please Create Subdomain to install Apps', 'warning');
            history.push(
                `${ROUTES.SUB_DOMAIN_SETUP}?return=${ROUTES.APP_STORE_APP}?id=${appDetails._id}`,
            );
            return;
        }
        await introduceDelay();
        const appInstallResponse = await installApp(appDetails._id);
        if (appInstallResponse) {
            dispatch(updateInstalledAppsState({ apps: appInstallResponse }));
            showMessage(`${appDetails.name} App Installed Successfully!`, 'success');
            setIsInstalling(false);
            handleOnLaunch();
        } else {
            // show error message with notifieer
            showMessage(
                'Something Went Wrong, Please try again later or reload the site!',
                'danger',
            );
            setIsInstalling(false);
            history.push(ROUTES.APP_STORE);
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div
            className={cx(
                styles.enlargedAppViewWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
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
                                        appHolderStyles.holderType,
                                        styles.installationStatus,
                                        appHolderStyles.holderTypeAppInstalled,
                                    )}
                                >
                                    <div className={appHolderStyles.holderTypeIcon}>
                                        <ICONS.APP />
                                    </div>
                                    <div className={appHolderStyles.holderTypeText}>Installed</div>
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
