import Card from 'components/Atoms/Card/Card';
import React, { ReactElement } from 'react';
import { ICurrencySettingsCardProps } from './CurrencySettingsCard.types';
import styles from './CurrencySettingsCard.module.scss';

export default function CurrencySettingsCard(props: ICurrencySettingsCardProps): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.cardWrapper,
                contentWrapper: styles.contentWrapper,
            }}
            content={
                <div className={styles.content}>
                    <div className={styles.contentLHS}>
                        <h6>Store Currency</h6>
                        <p>Please select the currency to use across your store</p>
                    </div>
                    <div></div>
                </div>
            }
        />
    );
}
