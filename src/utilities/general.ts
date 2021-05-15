/**
 * used to compute the x percent of y
 * @param values x: percent; y: percentOf
 * @returns number
 */
export const xPercentofY = (values: { x: number; y: number }): number => {
    return (values.x / 100) * values.y;
};

/**
 *
 * @param delay in seconds
 * @default
 * 4000
 */
export const introduceDelay = async (delay = 4000): Promise<boolean> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(true);
        }, delay),
    );

// formats numbers into indian currency
export const numberFormatINRCurrency = (value: number): string =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(value);

/**
 * Contains all the common symbols used in the app
 */
export const COMMON_SYMBOLS = {
    RUPEE_SYMBOL: '₹',
    PERCENTAGE_SYMBOL: '%',
};
