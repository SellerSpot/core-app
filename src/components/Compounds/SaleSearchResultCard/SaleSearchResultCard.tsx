import { Card } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';
import styles from './SaleSearchResultCard.module.scss';
import { numberFormatINRCurrency } from 'utilities/general';
import { isUndefined } from 'lodash';

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
