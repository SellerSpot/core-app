import { Image } from '@sellerspot/universal-components';
import { NoImageSvg } from 'assets/svgs/svgs';
import React, { ReactElement } from 'react';
import { numberFormatINRCurrency } from 'utilities/general';
import styles from './SaleSearchResultCard.module.scss';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';

export default function SaleSearchResultCard(props: ISaleSearchResultCard): ReactElement {
    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.productMeta}>
                <div className={styles.icon}>
                    <Image objectFit="contain" src={props.productImage || NoImageSvg} />
                </div>
                <h5 className={styles.title}>{props.productName}</h5>
                <h6 className={styles.productPrice}>{`${numberFormatINRCurrency(props.unitPrice)}/${
                    props.stockUnit
                }`}</h6>
            </div>
        </div>
    );
}
