import { Card } from '@sellerspot/universal-components';
import { isUndefined } from 'lodash';
import React, { ReactElement } from 'react';

import { numberFormatINRCurrency } from 'utilities/general';

import styles from './SaleSearchResultCard.module.scss';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';

export default function SaleSearchResultCard(props: ISaleSearchResultCard): ReactElement {
    return (
        <Card
            className={{
                cardWrapper: styles.cardWrapper,
                contentWrapper: styles.contentWrapper,
            }}
            onClick={props.onClick}
            content={
                <div className={styles.content}>
                    <div className={styles.contentLHS}>
                        {isUndefined(props.productImage) ? null : (
                            <div className={styles.image}>
                                <img className={styles.image} src={props.productImage} />
                            </div>
                        )}
                        <div>
                            <h6 className={styles.title}>{props.productName}</h6>
                        </div>
                    </div>
                    <div className={styles.contentRHS}>
                        <h6>{`${numberFormatINRCurrency(props.unitPrice)}/${props.stockUnit}`}</h6>
                    </div>
                </div>
            }
        />
    );
}
