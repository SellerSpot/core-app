import { css } from '@emotion/css';
import { ROUTES } from 'config/routes';
import { BillingExploreImage } from 'images/images';
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

    return (
        <div className={styles.billiingWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.promotionTitle}>
                        Thanks for being a Alpha Tester, <br />
                        You&apos;ve got all Apps and Plugins for free!.
                    </div>
                    <div className={styles.promotionSubTitle}>
                        Feel Free to <b>Explore!</b>
                    </div>
                    <div className={styles.requestContainer}>
                        <div className={styles.requestTitle}>You Could,</div>
                        <div className={styles.requestItems}>
                            <div className={styles.requestItem}> + &nbsp; Request Features</div>
                            <div className={styles.requestItem}>
                                + &nbsp; Request New Apps or Plugins
                            </div>
                            <div className={styles.requestItem}> + &nbsp; Report Bugs</div>
                            <div className={styles.requestItem}>
                                + &nbsp; Contact us @{' '}
                                <a href="mailto:contact.sellerspot@gmail.com">
                                    contact.sellerspot@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* promotion explore illustration */}
            <img className={styles.exploreImageWrapper} src={BillingExploreImage} alt="" />
        </div>
    );
};
