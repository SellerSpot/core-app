import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { pushBreadCrumbs } from 'store/models/breadCrumb';
import { IAppResponse, IResponse } from 'typings/request.types';
import { ICONS } from 'utilities/icons';
import { getAppById } from './appenlargedview.actions';
import { getEnlargedAppViewStyles } from './appenlargedview.styles';

const styles = getEnlargedAppViewStyles();

const AppIcon = (props: { appDetails: IAppResponse }) => {
    const Icon = ICONS[props.appDetails.iconUrl as keyof typeof ICONS];
    console.log(Icon, props.appDetails.iconUrl);
    return <Icon />;
};

export const AppEnlargedView = (): ReactElement => {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [appDetails, setAppDetails] = useState({} as IAppResponse);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    useEffect(() => {
        try {
            const appId = query.get('id');
            console.log(appId);
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
            console.log(error);
            // show notificaiton
            history.push(ROUTES.APP_STORE);
        }
    }, []);

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
                            label={'Install'}
                            style={{
                                height: 'auto',
                                width: 'auto',
                                padding: '15px 30px',
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
