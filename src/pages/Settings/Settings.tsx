import { cx } from '@emotion/css';
import { AlertMessage, Button } from '@sellerspot/universal-components';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unAuthenticate } from 'store/models/auth';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { animationStyles } from 'styles/animation.styles';
import { introduceDelay } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import { showMessage } from 'utilities/notify';
import { deleteTenantAccount } from './settings.actions';
import styles from './settings.module.scss';

export const Settings = (): ReactElement => {
    const dispatch = useDispatch();
    const [isDeletings, setIsDeleting] = useState(false);

    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.SETTINGS,
                    route: ROUTES.SETTINGS,
                    title: 'Settings',
                },
            ]),
        );
    }, []);

    const handleOnDelete = async () => {
        setIsDeleting(true);
        await introduceDelay();
        const response = await deleteTenantAccount();
        if (response) {
            showMessage(`Account Deleted Successfully, We Hope You'll Comeback Soon!`, 'success');
            dispatch(unAuthenticate());
        } else {
            // show notification about error
            showMessage('Error Deleting Account, Try again later or Contact Support!', 'danger');
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={cx(
                styles.settingsWrapper,
                animationStyles.compose.animate('fadeIn'),
                animationStyles.compose.duration(1),
            )}
        >
            <div className={styles.settingsMainContainer}>
                <div className={styles.deleteContainer}>
                    <div className={styles.deleteLanunchInstruction}>
                        <div className={styles.deleteLanunchInstruction}>
                            <SectionTitle title={`Delete Account`} />
                            <div>You are trying to Delete your Account</div>
                            <AlertMessage
                                type={'danger'}
                                label={
                                    'This is a destructive opearation!, All data generated in this account will be deleted permanenlty!'
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.deleteLanunchCallToAction}>
                        <Button
                            status={isDeletings ? 'disabledLoading' : 'default'}
                            label={isDeletings ? 'Deleting Account' : 'Delete Account'}
                            onClick={handleOnDelete}
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
