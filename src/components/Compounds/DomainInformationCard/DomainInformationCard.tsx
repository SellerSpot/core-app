import { Card, CardContent } from '@material-ui/core';
import React, { ReactElement } from 'react';
import styles from './DomainInformationCard.module.scss';

export default function DomainInformationCard(): ReactElement {
    return (
        <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <h5>Your SellerSpot App is hosted at</h5>
                <a
                    href="https://sreenithi.dashboard.sellerspot.in"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                >
                    <h6 className={styles.linkText}>sreenithi.dashboard.sellerspot.in</h6>
                </a>
            </CardContent>
        </Card>
    );
}
