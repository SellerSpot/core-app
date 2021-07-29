import React, { ReactElement } from 'react';
import styles from './BillA4PurchaseInvoice.module.scss';
import mainStyles from '../../BillA4.module.scss';
import commonStyles from '../../../../../styles/common.module.scss';
import cn from 'classnames';
import { COMMON_SYMBOLS } from 'utilities/general';
import { IBillA4ChildProps } from '../../BillA4.types';
import { CSSProperties } from 'react';

export const BillA4PurchaseInvoice = (props: IBillA4ChildProps): ReactElement => {
    const {
        settings: { purchaseInvoiceSection },
    } = props;
    const { MRPColumn, discountColumn, taxColumn } = purchaseInvoiceSection;
    const totalRepeatedColumn = 6;
    const columnToDisableCount = [MRPColumn, discountColumn, taxColumn].reduce(
        (result, current) => {
            if (!current) return result + 1;
            return result;
        },
        0,
    );
    const totalRepeatativeColumnToShow = totalRepeatedColumn - columnToDisableCount;
    const tableGridStyle: CSSProperties = {
        gridTemplateColumns: `30px 2fr repeat(${totalRepeatativeColumnToShow}, 1fr)`,
    };
    return (
        <>
            <div className={mainStyles.billSubTitle}>PURCHASE INVOICE</div>
            <div className={mainStyles.dashedBorder} />
            <div className={mainStyles.billTableWrapper}>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.purchaseInvoiceTable,
                        mainStyles.billTableNodeHead,
                    )}
                    style={tableGridStyle}
                >
                    <div className={cn(commonStyles.textAlignCenter)}>SNo</div>
                    <div className={cn(commonStyles.textAlignLeft)}>Item</div>
                    <div className={cn(commonStyles.textAlignRight)}>Qty</div>
                    {MRPColumn && <div className={cn(commonStyles.textAlignRight)}>MRP</div>}
                    <div className={cn(commonStyles.textAlignRight)}>Our Price</div>
                    {discountColumn && (
                        <div className={cn(commonStyles.textAlignRight)}>Discount</div>
                    )}
                    {taxColumn && <div className={cn(commonStyles.textAlignRight)}>Tax</div>}
                    <div className={cn(commonStyles.textAlignRight)}>Total</div>
                </div>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.purchaseInvoiceTable,
                        mainStyles.billTableNodeContent,
                    )}
                    style={tableGridStyle}
                >
                    <div className={cn(commonStyles.textAlignCenter)}>
                        <h6>1</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignLeft)}>
                        {/* {saleData.products[i].name} */}
                        <h6>Sample Data</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {saleData.productCartInformation[i].itemQuantity} */}
                        <h6>20</h6>
                    </div>
                    {MRPColumn && (
                        <div className={cn(commonStyles.textAlignRight)}>
                            {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.products[i].mrpPrice}`} */}
                            <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${232}`}</h6>
                        </div>
                    )}
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.products[i].sellingPrice}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${200}`}</h6>
                    </div>
                    {discountColumn && (
                        <div className={cn(commonStyles.textAlignRight)}>
                            {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].totalDiscountValue} @ ${saleData.productCartInformation[i].itemDiscountPercent}`} */}
                            <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123} @ ${12}`}</h6>
                        </div>
                    )}
                    {taxColumn && (
                        <div className={cn(commonStyles.textAlignRight)}>
                            {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].totalTax}`} */}
                            <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                        </div>
                    )}
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].itemTotal}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${1231}`}</h6>
                    </div>
                </div>
            </div>
        </>
    );
};
