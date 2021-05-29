import { ITaxBracket } from 'components/Compounds/CartTable/CartTable.types';
import { xPercentofY } from 'utilities/general';

export default class SaleService {
    /**
     * used to compute the discount for a product (percentage method)
     * @param values unitprice & discount
     * @returns number (discounted unit price)
     */
    public computeDiscountUsingPercentage = (values: {
        unitPrice: number;
        discountPercent: number;
    }): number => {
        return xPercentofY({
            x: values.discountPercent,
            y: values.unitPrice,
        });
    };

    /**
     * used to compute the total tax value for a product
     * @param values taxBrackets[] & unitPrice (after discount) & quantity
     * @returns number (the total tax value for the product)
     */
    public computeTaxValue = (values: {
        taxBrackets: ITaxBracket[];
        unitPrice: number;
        quantity: number;
    }): number => {
        let taxValue = 0;
        for (const bracket of values.taxBrackets) {
            taxValue +=
                xPercentofY({
                    x: bracket.bracketRate,
                    y: values.unitPrice,
                }) * values.quantity;
        }
        return taxValue;
    };

    /**
     * used to compute the subtotal for a product
     * @param values
     * @returns number (sub-total for the product)
     */
    public computeProductSubTotal = (values: {
        unitPrice: number;
        quantity: number;
        discountPercent: number;
        taxBrackets: ITaxBracket[];
    }): number => {
        const unitPriceAfterDiscount =
            values.unitPrice -
            this.computeDiscountUsingPercentage({
                discountPercent: values.discountPercent,
                unitPrice: values.unitPrice,
            });
        const taxValueforProduct = this.computeTaxValue({
            quantity: values.quantity,
            taxBrackets: values.taxBrackets,
            unitPrice: unitPriceAfterDiscount,
        });
        return unitPriceAfterDiscount * values.quantity + taxValueforProduct;
    };
}
