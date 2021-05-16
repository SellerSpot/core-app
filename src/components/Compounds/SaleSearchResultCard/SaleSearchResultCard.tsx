import { isUndefined } from 'lodash';
import React, { ReactElement } from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import styles from './SaleSearchResultCard.module.scss';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';

export default function SaleSearchResultCard(props: ISaleSearchResultCard): ReactElement {
    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.productMeta}>
                {isUndefined(props.productImage) ? null : <img src={props.productImage} />}
                <h5 className={styles.title}>{props.productName}</h5>
            </div>
            <div className={styles.productPrice}>
                <h6>{`${numberFormatINRCurrency(props.unitPrice)}/${props.stockUnit}`}</h6>
            </div>
        </div>
    );
}
