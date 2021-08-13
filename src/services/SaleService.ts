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
    public computeDiscount = (props: { unitPrice: number; discount: IDiscount }): number => {
        const {
            discount: { discount, discountType },
            unitPrice,
        } = props;

        let totalDiscount = 0;

        if (discountType === EDiscountTypes.VALUE) {
            totalDiscount = discount <= unitPrice ? discount : unitPrice;
        } else {
            totalDiscount = xPercentofY({
                x: discount,
                y: unitPrice,
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
    public computeProductSubTotal = (props: {
        unitPrice: number;
        quantity: number;
        discount: IDiscount;
        taxBracket: ITaxBracketData | ISaleTaxBracket;
    }): number => {
        const { discount, quantity, taxBracket, unitPrice } = props;

        const unitPriceAfterDiscount =
            props.unitPrice -
            this.computeDiscount({
                discount,
                unitPrice,
            });

        const totalTax = this.computeTaxValue({
            quantity,
            taxBracket,
            unitPrice: unitPriceAfterDiscount,
        });
        return unitPriceAfterDiscount * quantity + totalTax;
    };
}
