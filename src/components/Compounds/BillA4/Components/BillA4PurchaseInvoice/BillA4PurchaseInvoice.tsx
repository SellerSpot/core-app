import React, { ReactElement } from 'react';
import styles from './BillA4PurchaseInvoice.module.scss';
import mainStyles from '../../BillA4.module.scss';
import commonStyles from '../../../../../styles/common.module.scss';
import cn from 'classnames';
import { IBillA4ChildProps } from '../../BillA4.types';
import { CSSProperties } from 'react';
import { numberFormatINRCurrency } from 'utilities/general';

export const BillA4PurchaseInvoice = (props: IBillA4ChildProps): ReactElement => {
    // props
    const {
        settings: { purchaseInvoiceSection },
        data,
    } = props;
    const { MRPColumn, discountColumn, taxColumn } = purchaseInvoiceSection;
    const { cart } = data;

    // compute
    const totalRepeatedColumn = 6;
    const columnsToDisableCount = [MRPColumn, discountColumn, taxColumn].reduce(
        (result, current) => {
            if (!current) return result + 1;
            return result;
        },
        0,
    );
    const totalRepeatativeColumnToShow = totalRepeatedColumn - columnsToDisableCount;
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
                {cart.map((cartItem, key) => (
                    <div
                        key={key}
                        className={cn(
                            mainStyles.billTableNode,
                            styles.purchaseInvoiceTable,
                            mainStyles.billTableNodeContent,
                        )}
                        style={tableGridStyle}
                    >
                        <div className={cn(commonStyles.textAlignCenter)}>
                            <h6>{key + 1}</h6>
                        </div>
                        <div className={cn(commonStyles.textAlignLeft)}>
                            <h6>{cartItem.product.name}</h6>
                        </div>
                        <div className={cn(commonStyles.textAlignRight)}>
                            <h6>{cartItem.quantity}</h6>
                        </div>
                        {MRPColumn && (
                            <div className={cn(commonStyles.textAlignRight)}>
                                <h6>{numberFormatINRCurrency(cartItem.mrp)}</h6>
                            </div>
                        )}
                        <div className={cn(commonStyles.textAlignRight)}>
                            <h6>{numberFormatINRCurrency(cartItem.sellingPrice)}</h6>
                        </div>
                        {discountColumn && (
                            <div className={cn(commonStyles.textAlignRight)}>
                                <h6>{numberFormatINRCurrency(cartItem.totalDiscount)}</h6>
                            </div>
                        )}
                        {taxColumn && (
                            <div className={cn(commonStyles.textAlignRight)}>
                                <h6>{numberFormatINRCurrency(cartItem.totalTax)}</h6>
                            </div>
                        )}
                        <div className={cn(commonStyles.textAlignRight)}>
                            <h6>{numberFormatINRCurrency(cartItem.grandTotal)}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
