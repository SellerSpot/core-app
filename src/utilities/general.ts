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
 * Redirects to the passed url
 *
 * @param {string} url url to open
 * @param {'_self' | '_blank'} whether to open in the same tab or in new tab
 */
export const redirectTo = (url: string, target: '_self' | '_blank' = '_self'): void => {
    window.open(url, target);
};
