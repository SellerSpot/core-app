// contains the business logic used throught the application

// used to compute the x percent of y
export const xPercentofY = (values: { x: number; y: number }): number => {
    return (values.x / 100) * values.y;
};

/**
 * used to compute the discount for a product (percentage method)
 * @param values unitprice & discount
 * @returns number (discounted unit price)
 */
export const computeDiscountUsingPercentage = (values: {
    unitPrice: number;
    discountPercent: number;
}): number => {
    return xPercentofY({
        x: values.discountPercent,
        y: values.unitPrice,
    });
};
