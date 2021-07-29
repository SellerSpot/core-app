import React from 'react';
import { ISelectOption } from '@sellerspot/universal-components';
import { IStockUnitData } from '@sellerspot/universal-types';
import styles from './Fields.module.scss';

export class ProductSliderFieldsService {
    static formatStockUnitDataForSelectComponent = (stockUnit: IStockUnitData): ISelectOption => {
        // component
        const stockUnitSelectLabel = (
            <div className={styles.stockUnitSelectLabel}>
                <p>{stockUnit.name}</p>
                <p>
                    <b>{`  [${stockUnit.unit}]`}</b>
                </p>
            </div>
        );
        return {
            labelToShow: stockUnitSelectLabel,
            label: stockUnit.name,
            value: stockUnit.id,
        };
    };
}
