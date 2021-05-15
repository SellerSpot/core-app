import React, { ReactElement } from 'react';
import styles from './BillA4PurchaseInvoice.module.scss';
import mainStyles from '../../BillA4.module.scss';
import commonStyles from '../../../../../styles/common.module.scss';
import cn from 'classnames';
import { COMMON_SYMBOLS } from 'utilities/general';

export const BillA4PurchaseInvoice = (): ReactElement => {
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
                >
                    <div className={cn(commonStyles.textAlignCenter)}>SNo</div>
                    <div className={cn(commonStyles.textAlignLeft)}>Item</div>
                    <div className={cn(commonStyles.textAlignRight)}>Qty</div>
                    <div className={cn(commonStyles.textAlignRight)}>MRP</div>
                    <div className={cn(commonStyles.textAlignRight)}>Our Price</div>
                    <div className={cn(commonStyles.textAlignRight)}>Discount</div>
                    <div className={cn(commonStyles.textAlignRight)}>Tax</div>
                    <div className={cn(commonStyles.textAlignRight)}>Total</div>
                </div>
                <div
                    className={cn(
                        mainStyles.billTableNode,
                        styles.purchaseInvoiceTable,
                        mainStyles.billTableNodeContent,
                    )}
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
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.products[i].mrpPrice}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${232}`}</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.products[i].sellingPrice}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${200}`}</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].totalDiscountValue} @ ${saleData.productCartInformation[i].itemDiscountPercent}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123} @ ${12}`}</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].totalTax}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${123}`}</h6>
                    </div>
                    <div className={cn(commonStyles.textAlignRight)}>
                        {/* {`${COMMON_SYMBOLS.RUPEE_SYMBOL}${saleData.productCartInformation[i].itemTotal}`} */}
                        <h6>{`${COMMON_SYMBOLS.RUPEE_SYMBOL}${1231}`}</h6>
                    </div>
                </div>
            </div>
        </>
    );
};
