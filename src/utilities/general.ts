/**
 * used to compute the x percent of y
 * @param values x: percent; y: percentOf
 * @returns number
 */
export const xPercentofY = (values: { x: number; y: number }): number => {
    return (values.x / 100) * values.y;
};

/**
 * Generate a string anywhere between zero and 12 characters long
 * You can expect a duplicate after around 70M strings generated
 * @returns string
 */
export const generateRandomString = (): string => Math.random().toString(36).slice(2);

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

export const COMMON_SYMBOLS = {
    RUPEE_SYMBOL: '₹',
    PERCENTAGE_SYMBOL: '%',
};

/**
 * Redirects to the passed url
 *
 * @param {string} url url to open
 * @param {'_self' | '_blank'} whether to open in the same tab or in new tab
 */
export const redirectTo = (url: string, target: '_self' | '_blank' = '_self'): void => {
    window.open(url, target);
};

export const rawClone = <T = unknown>(data: unknown): T => {
    return JSON.parse(JSON.stringify(data));
};
