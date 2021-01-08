import { css } from '@emotion/css';
import { AlertMessage, Button } from '@sellerspot/universal-components';
import { SectionTitle } from 'components/SectionTitle/SectionTitle';
import { COLORS } from 'config/colors';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unAuthenticate } from 'store/models/auth';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { closeConfirmDialog } from 'store/models/confirmDialog';
import { ICONS } from 'utilities/icons';
import { deleteTenantAccount } from './settings.actions';

export const Settings = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
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

    const handleOnDelete = () => {
        setIsDeleting(true);
        setTimeout(async () => {
            const response = await deleteTenantAccount();
            if (response) {
                dispatch(unAuthenticate());
                dispatch(closeConfirmDialog());
            } else {
                // show notification about error
                setIsDeleting(false);
            }
        }, 3000);
    };

    const styles = {
        settingsWrapper: css`
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            align-items: center;
            flex-direction: column;
        `,

        settingsMainContainer: css`
            margin-top: 100px;
            width: 60%;
            height: auto;
        `,

        deleteContainer: css`
            padding: 50px;
            width: 100%;
            height: auto;
            box-shadow: 0 0 5px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 30px;
        `,

        deleteLanunchInstruction: css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 25px;
        `,

        deleteInstructiontitle: css`
            font-size: 25px;
        `,

        deleteLanunchCallToAction: css`
            width: auto;
            height: auto;
        `,
    };

    return (
        <div className={styles.settingsWrapper}>
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
