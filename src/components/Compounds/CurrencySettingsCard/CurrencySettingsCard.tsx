import { Card } from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { ICurrencySettingsCardProps } from './CurrencySettingsCard.types';
import styles from './CurrencySettingsCard.module.scss';
import { Select } from '@sellerspot/universal-components';

export default function CurrencySettingsCard(props: ICurrencySettingsCardProps): ReactElement {
    const [selectedCurrency, setSelectedCurrency] = useState(0);
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
                    <Select
                        options={props.currencies.map((currency, index) => {
                            return {
                                text: `${currency.currencyName} (${currency.currencyLogo})`,
                                value: index,
                            };
                        })}
                        onChange={(event) => {
                            setSelectedCurrency(+event.target.value);
                        }}
                        value={selectedCurrency}
                    />
                </div>
            }
        />
    );
}
