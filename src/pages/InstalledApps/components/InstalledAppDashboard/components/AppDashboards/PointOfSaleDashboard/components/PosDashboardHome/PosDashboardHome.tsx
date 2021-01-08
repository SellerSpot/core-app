import { Button } from '@sellerspot/universal-components';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { IInstalledAppLaunchDomainResponse } from 'typings/response.types';
import { ICONS } from 'utilities/icons';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { getPosdashboardHomeStyles } from './posdashboardhome.styles';

const styles = getPosdashboardHomeStyles();

export const PosDashboardHome = (props: IInstalledAppDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    const [appDomainDetails, setAppDomainDetails] = useState({
        tenantDomain: 'spark',
        appDomain: 'pos',
        baseDomain: 'sellerspot.in',
        customDomain: '',
        protocol: 'https',
    } as IInstalledAppLaunchDomainResponse);
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
        window.open(
            `${appDomainDetails.protocol}://${appDomainDetails.appDomain}.${appDomainDetails.tenantDomain}.${appDomainDetails.baseDomain}`,
            '__sellerspotpos',
        );
    };
    return (
        <div className={styles.posDashboardHomeWrapper}>
            <div className={styles.homeContainer}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeContainerLanunchInstruction}>
                        <div className={styles.welcomeInstructiontitle}>
                            Your <b>Point of Sale </b> App is Deployed at the following url, Happy
                            Selling!
                        </div>
                        <div className={styles.welcomeInstructionLinkHolder}>
                            <a
                                className={styles.welcomeInstructionLink}
                                href={'https://pos.spark.sellerspot.in'}
                                onClick={onLaunchHandler}
                                target={'__sellerspotpos'}
                            >
                                https://pos.spark.sellerspot.in
                            </a>
                        </div>
                    </div>
                    <div className={styles.welcomeContainerLanunchCallToAction}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
