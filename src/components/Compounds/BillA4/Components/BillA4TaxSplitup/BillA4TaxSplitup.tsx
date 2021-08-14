import React, { ReactElement } from 'react';
import styles from './BillA4TaxSplitup.module.scss';
import mainStyles from '../../BillA4.module.scss';
import commonStyles from '../../../../../styles/common.module.scss';
import cn from 'classnames';
import { IBillA4ChildProps } from '../../BillA4.types';

export const BillA4TaxSplitup = (props: IBillA4ChildProps): ReactElement => {
    // props
    const {
        settings: { taxSplitUpSection },
        data,
    } = props;
    const { payment, taxSplitUps } = data;
    const { totalTax } = payment;

    // computer

    return (
        <>
            {taxSplitUpSection.show && (
                <>
                    <div className={mainStyles.billSubTitle}>TAX SPLIT UP</div>
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
                        {taxSplitUps.forEach((taxSplitUp, key) => (
                            <div
                                key={key}
                                className={cn(
                                    mainStyles.billTableNode,
                                    styles.taxSplitupTable,
                                    mainStyles.billTableNodeContent,
                                )}
                            >
                                <div className={cn(commonStyles.textAlignLeft)}>
                                    <h6>
                                        {taxSplitUp.name} {taxSplitUp.rate}%
                                    </h6>
                                </div>
                                <div className={cn(commonStyles.textAlignLeft)}>
                                    <h6>{taxSplitUp.cartItemsSerialNumber.join(', ')}</h6>
                                </div>
                                <div className={cn(commonStyles.textAlignRight)}>
                                    <h6>{taxSplitUp.taxableValue}</h6>
                                </div>
                                <div className={cn(commonStyles.textAlignRight)}>
                                    <h6>{taxSplitUp.taxAmount}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={mainStyles.advertisementAndGrandTotalWrapper}>
                        <div>
                            {/* left intentionally for matching style requirement don't remove */}
                        </div>
                        <div className={mainStyles.grandTotalWrapper}>
                            <div className={mainStyles.grandTotalHolder}>
                                <div className={mainStyles.grandTotalTitle}>
                                    <h6>Total Tax</h6>
                                </div>
                                <div className={mainStyles.grandTotalValue}>
                                    <h6>{totalTax}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
