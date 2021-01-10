import { css } from '@emotion/css';
import { AlertMessage, Button, IConfirmDialogProps } from '@sellerspot/universal-components';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import { uninstallTenantInstalledAppById } from 'pages/InstalledApps/components/InstalledAppDashboard/installedappsdashboard.actions';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { pushBreadCrumbs, removePreviouslyInsertedBreadCrumbs } from 'store/models/breadCrumb';
import { closeConfirmDialog, openConfirmDialog } from 'store/models/confirmDialog';
import { updateInstalledAppsState } from 'store/models/installedApps';
import { introduceDelay } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import { IInstalledAppDashboardProps } from '../../../installedappdashboard.types';
import { getPosdashboardSettingsStyles } from './posdashboardsettings.styles';

const styles = getPosdashboardSettingsStyles();

export const PosDashboardSettings = (props: IInstalledAppDashboardProps): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isUninstalling, setIsUninstalling] = useState(false);
    useEffect(() => {
        dispatch(
            pushBreadCrumbs([
                {
                    icon: ICONS['SETTINGS'],
                    route: `${ROUTES.INSTALLED_APP_POINT_OF_SALE_SETTINGS}`,
                    title: 'Settings',
                },
            ]),
        );
        return () => {
            dispatch(removePreviouslyInsertedBreadCrumbs());
        };
    }, []);

    const handleOnUninstall = async () => {
        setIsUninstalling(true);
        await introduceDelay();
        const appResponse = await uninstallTenantInstalledAppById(props.appDetails._id);
        if (appResponse) {
            dispatch(updateInstalledAppsState({ apps: appResponse }));
            dispatch(closeConfirmDialog());
            history.push(ROUTES.INSTALLED_APPS);
        } else {
            // show notification about error
            setIsUninstalling(false);
        }
    };

    return (
        <div className={styles.posDashboardSettingsWrapper}>
            <div className={styles.settingsContainer}>
                <div className={styles.uninstallContainer}>
                    <div className={styles.uninstallLanunchInstruction}>
                        <div className={styles.uninstallLanunchInstruction}>
                            <SectionTitle title={`Uninstall ${props.appDetails.name} App`} />
                            <div>You are trying to uninstall your {props.appDetails.name} App</div>
                            <AlertMessage
                                type={'danger'}
                                label={
                                    'This is a destructive opearation!, All data generated in this app will be deleted permanenlty!'
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.uninstallLanunchCallToAction}>
                        <Button
                            status={isUninstalling ? 'disabledLoading' : 'default'}
                            label={isUninstalling ? 'Uninstalling' : 'Uninstall'}
                            onClick={handleOnUninstall}
                            style={{
                                fontWeight: 'bold',
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderRadius: 5,
                                fontSize: 16,
                                color: COLORS['FOREGROUND_WHITE'],
                                backgroundColor: COLORS['BACKGROUND_DANGER'],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
