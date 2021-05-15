import React, { ReactElement } from 'react';
import styles from './BillA4TaxSplitup.module.scss';
import mainStyles from '../../BillA4.module.scss';
import commonStyles from '../../../../../styles/common.module.scss';
import cn from 'classnames';

export const BillA4TaxSplitup = (): ReactElement => {
    return (
        <>
            <div className={mainStyles.billSubTitle}>
                <h6>TAX SPLIT UP</h6>
            </div>
            <div className={mainStyles.dashedBorder} />
            <div className={mainStyles.billTableWrapper}>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.taxSplitupTable,
                        mainStyles.billTableNodeHead,
                    )}
                >
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>Tax Brackets</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>Items (SNo)</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>Taxable Value</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>Tax Amount</h6>
                    </div>
                </div>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.taxSplitupTable,
                        mainStyles.billTableNodeContent,
                    )}
                >
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>CGST (5%)</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>1, 2</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>₹ 12,186.00</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>₹ 609.30</h6>
                    </div>
                </div>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.taxSplitupTable,
                        mainStyles.billTableNodeContent,
                    )}
                >
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>CESS (1%)</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignLeft)}>
                        <h6>1</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>₹ 10,800.00</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        <h6>₹ 108.30</h6>
                    </div>
                </div>
            </div>
        </>
    );
};
