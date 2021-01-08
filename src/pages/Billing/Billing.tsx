import { css } from '@emotion/css';
import { ROUTES } from 'config/routes';
import { BillingExploreImage } from 'images/images';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAndPushBreadCrumbs } from 'store/models/breadCrumb';
import { ICONS } from 'utilities/icons';
import { getBillingStyles } from './billing.styles';

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
    const styles = {
        billiingWrapper: css`
            width: 100%;
            height: 100%;
            padding: 50px;
            position: relative;
        `,

        exploreImageWrapper: css`
            position: absolute;
            bottom: 0;
            right: 0;
            width: 40%;
            height: auto;
        `,

        contentWrapper: css`
            margin-top: 50px;
            width: 60%;
            display: flex;
            flex-direction: column;
            gap: 50px;
        `,

        promotionTitle: css`
            font-size: 28px;
            font-weight: bold;
            line-height: 45px;
        `,

        promotionSubTitle: css`
            font-size: 25px;
        `,

        requestContainer: css``,

        requestTitle: css`
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 10px;
        `,

        requestItems: css`
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-left: 20px;
            margin-top: 20px;
        `,

        requestItem: css`
            display: flex;
            font-size: 20px;
            gap: 10px;
        `,
    };
    return (
        <div className={styles.billiingWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.promotionTitle}>
                        Thanks for being a Beta Tester, <br />
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
