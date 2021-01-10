import { cx } from '@emotion/css';
import { AlertMessage, Button } from '@sellerspot/universal-components';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { animationStyles } from 'styles/animation.styles';
import { IAppDomainUrl } from 'typings/utilities.types';
import { getDomainUrlFromAppDomainDetails } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { getPosdashboardHomeStyles } from './posdashboardhome.styles';

const styles = getPosdashboardHomeStyles();

export const PosDashboardHome = (props: IInstalledAppDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [appUrl, setAppUrl] = useState<IAppDomainUrl>(
        getDomainUrlFromAppDomainDetails(props.appDomainDetails),
    );
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
    const onLaunchHandler = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        if (appUrl.isValid) {
            window.open(appUrl.url);
        }
    };
    return (
        <div
            className={cx(
                styles.posDashboardHomeWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <div className={styles.homeContainer}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeContainerLanunchInstruction}>
                        <div className={styles.welcomeInstructiontitle}>
                            Your <b>Point of Sale </b> App is Deployed at the following url, Happy
                            Selling!
                        </div>
                        <div className={styles.welcomeInstructionLinkHolder}>
                            {appUrl.isValid ? (
                                <a
                                    className={styles.welcomeInstructionLink}
                                    href={appUrl.url}
                                    onClick={onLaunchHandler}
                                    target={'__sellerspotpos'}
                                >
                                    {appUrl.url}
                                </a>
                            ) : (
                                <AlertMessage
                                    type={'info'}
                                    label={`Seems like you haven't created your domain yet, create domain to launch any App`}
                                    style={{
                                        alertMessageWrapperStyle: {
                                            padding: 20,
                                        },
                                    }}
                                    actionButton={
                                        <Button
                                            label={'Create Domain Now'}
                                            style={{
                                                marginLeft: 10,
                                                whiteSpace: 'nowrap',
                                                background: COLORS.COLOR_SUCCESS,
                                                color: COLORS.FOREGROUND_WHITE,
                                            }}
                                            onClick={() => history.push(ROUTES.SUB_DOMAIN_SETUP)}
                                        />
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.welcomeContainerLanunchCallToAction}>
                        {appUrl.isValid && (
                            <Button
                                onClick={onLaunchHandler}
                                status={'default'}
                                label={'Launch'}
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
