import { xPercentofY } from 'utilities/general';
import { EDiscountTypes, IDiscount, ITaxBracket } from '@sellerspot/universal-types';
import { isArray } from 'lodash';

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
            xPercentofY({
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
        taxBracket: ITaxBracket;
        unitPrice: number;
        quantity: number;
    }): number => {
        const { quantity, taxBracket, unitPrice } = props;
        const { rate, group: taxGroup } = taxBracket;
        // need to integrate for the tax group
        let totalTaxRate = 0;
        if (isArray(taxGroup)) {
            totalTaxRate = taxGroup.reduce(
                (totalRate, currentTaxNode) => totalRate + currentTaxNode.rate,
                0,
            );
        } else {
            totalTaxRate = rate;
        }
        return (
            xPercentofY({
                x: totalTaxRate,
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
        taxBracket: ITaxBracket;
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
