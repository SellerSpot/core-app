import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getBillingStyles } from './billing.styles';
const styles = getBillingStyles();

export const Billing = (): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            clearAndPushBreadCrumbs([
                {
                    icon: ICONS.BILLING,
                    route: ROUTES.BILLING,
                    title: 'Billing',
                },
            ]),
        );
    }, []);
    return <div className={styles.billingWrapper}>Billing</div>;
};
