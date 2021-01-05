import { Button } from '@sellerspot/universal-components';
import { Loader } from 'components/Loader/Loader';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { pushBreadCrumbs } from 'store/models/breadCrumb';
import { installedAppsSelector, updateInstalledAppsState } from 'store/models/installedApps';
import { IAppResponse, IResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { getAppById, installApp } from './appenlargedview.actions';
import { getEnlargedAppViewStyles } from './appenlargedview.styles';

const styles = getEnlargedAppViewStyles();

const AppIcon = (props: { appDetails: IAppResponse }) => {
    const Icon = ICONS[props.appDetails.iconUrl as keyof typeof ICONS];
    return <Icon />;
};

export const AppEnlargedView = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [isInstalling, setIsInstalling] = useState(false);
    const installedAppsState = useSelector(installedAppsSelector);

    useEffect(() => {
        try {
            const appId = query.get('id');
            if (!appId) throw 'Invalid Url';
            (async () => {
                const response = await getAppById(appId);
                const { status, data } = response as IResponse & { data: IAppResponse };
                if (!status || !data._id) throw response;
                dispatch(
                    pushBreadCrumbs([
                        {
                            icon: ICONS.APP,
                            route: ROUTES.APP_STORE,
                            title: 'Apps',
                        },
                        {
                            icon: ICONS[data.iconUrl as keyof typeof ICONS],
                            route: `${ROUTES.APP_STORE_APPS}/${data._id}`,
                            title: data.name,
                        },
                    ]),
                );
                setAppDetails(data);
                setIsLoading(false);
            }).call(null);
        } catch (error) {
            console.error(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }
    }, []);

    const handleOnLaunch = () => {
        history.push(`${ROUTES.INSTALLED_APPS_APP}?id=${appDetails._id}`);
    };

    const handleOnInstallClick = async (): Promise<void> => {
        setIsInstalling(true);
        setTimeout(async () => {
            const response = await installApp(appDetails._id);
            console.log(response);
            if (response.status) {
                console.log(response.data);
                dispatch(updateInstalledAppsState({ apps: response.data as IAppResponse[] }));
                setIsInstalling(false);
                handleOnLaunch();
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
                        <div className={styles.appTitle}>{appDetails.name}</div>
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
