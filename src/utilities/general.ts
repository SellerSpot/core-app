import { FieldMetaState } from 'react-final-form';
import { TreeIndex, TreeNode } from 'react-sortable-tree';
import * as yup from 'yup';
import { ISelectOption } from '@sellerspot/universal-components';

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
 * @param url url to open
 * @param target whether to open in the same tab or in new tab
 * @param replace whether to replace the the current window url and completely replace it with new one
 */
export const redirectTo = (
    url: string,
    target: '_self' | '_blank' = '_self',
    replace = false,
): void => {
    if (replace) {
        location.replace(url);
    } else {
        window.open(url, target);
    }
};

export const rawClone = <T = unknown>(data: unknown): T => {
    return JSON.parse(JSON.stringify(data));
};

// used to decide if the inputfield has to show error helpermessage or not
export const showErrorHelperMessage = (meta: FieldMetaState<unknown>): boolean => {
    // props
    const { error, submitError, touched, dirty, submitFailed } = meta;
    // decide
    if ((error || submitError) && touched && (dirty || submitFailed)) {
        return true;
    }
    return false;
};

// used to validate ReactSlect fields
export const SelectOptionValidationSchema: yup.SchemaOf<ISelectOption> = yup.object({
    label: yup.string(),
    value: yup.string(),
    labelToShow: yup.mixed().optional(),
    key: yup.mixed().optional(),
});

// used to the get the key property for a node
// in react-sortable-tree
export const getNodeKey = (data: TreeIndex & TreeNode): string => data.node.id;
