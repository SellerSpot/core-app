import Card from 'components/Atoms/Card/Card';
import React, { ReactElement } from 'react';
import styles from './DomainInformationCard.module.scss';

export default function DomainInformationCard(): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.card,
                contentWrapper: styles.contentWrapper,
            }}
            content={
                <div className={styles.cardContent}>
                    <h5>Your SellerSpot App is hosted at</h5>
                    <a
                        href="https://sreenithi.dashboard.sellerspot.in"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        <h6 className={styles.linkText}>sreenithi.dashboard.sellerspot.in</h6>
                    </a>
                </div>
            }
        />
    );
}
