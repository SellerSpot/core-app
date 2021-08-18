import { xPercentofY } from 'utilities/general';
import {
    EDiscountTypes,
    IDiscount,
    ISaleTaxBracket,
    ITaxBracketData,
} from '@sellerspot/universal-types';

export default class SaleService {
    /**
     * used to compute the discount for a product (percentage method)
     * @param props unitprice & discount
     * @returns the discount amount
     */
    public computeDiscount = (props: { sellingPrice: number; discount: IDiscount }): number => {
        const {
            discount: { discount, discountType },
            sellingPrice,
        } = props;

        let totalDiscount = 0;

        if (discountType === EDiscountTypes.VALUE) {
            totalDiscount = discount <= sellingPrice ? discount : sellingPrice;
        } else {
            totalDiscount = xPercentofY({
                x: discount,
                y: sellingPrice,
            });
        }
        return totalDiscount;
    };

    /**
     * used to compute the total tax value for a product
     * @param props taxBrackets[] & unitPrice (after discount) & quantity
     * @returns number (the total tax value for the product)
     */
    public computeTaxValue = (props: {
        taxBracket: ITaxBracketData | ISaleTaxBracket;
        unitPrice: number;
        quantity: number;
    }): number => {
        const { quantity, taxBracket, unitPrice } = props;
        const { rate } = taxBracket;
        // for tax groups, server will send the calulated tax rate at the hierarchy level 0 itself,
        // no need to iterate over group and calculate final rate
        return (
            xPercentofY({
                x: rate,
                y: unitPrice,
            }) * quantity
        );
    };

    /**
     * used to compute the subtotal for a product
     * @param props
     * @returns number (sub-total for the product)
     */
    public computeProductTotals = (props: {
        sellingPrice: number;
        quantity: number;
        discount: IDiscount;
        taxBracket: ITaxBracketData | ISaleTaxBracket;
    }): {
        totalDiscount: number;
        unitPriceAfterDiscount: number;
        totalTax: number;
        grandTotal: number;
        taxableAmount: number;
    } => {
        const { discount, quantity, taxBracket, sellingPrice } = props;

        const totalDiscount = this.computeDiscount({
            discount,
            sellingPrice,
        });

        const unitPriceAfterDiscount = props.sellingPrice - totalDiscount;

        const totalTax = this.computeTaxValue({
            quantity,
            taxBracket,
            unitPrice: unitPriceAfterDiscount,
        });
        const grandTotal = unitPriceAfterDiscount * quantity + totalTax;
        const taxableAmount = grandTotal - totalTax;

        return {
            grandTotal,
            totalDiscount,
            totalTax,
            taxableAmount,
            unitPriceAfterDiscount,
        };
    };

    /**
     * used to compute selling price depending on landing cost and markup
     * @param props
     * @returns number (selling price)
     */
    public computeSellingPrice = (props: {
        landingCost: number;
        markupPercentage: number;
    }): number => {
        // props
        const { landingCost, markupPercentage } = props;

        // compute
        const makrupAmount = xPercentofY({
            x: markupPercentage,
            y: landingCost,
        });

        return +(landingCost + makrupAmount).toFixed(2);
    };
}
