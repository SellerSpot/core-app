import { ITableCell } from '@sellerspot/universal-components';
import { AnyObject, setIn } from 'final-form';
import * as yup from 'yup';

import { updateCartProduct } from 'store/models/cart';
import { store } from 'store/store';

import { ICartTableFormValue, ICartTableProduct } from './CartTable.types';

export class CartTableService {
    public static tableHeaders: ITableCell[] = [
        {
            content: 'S.No',
            width: '5%',
            align: 'left',
        },
        {
            content: 'Product',
            width: '55%',
            align: 'left',
        },
        {
            content: 'Qty',
            width: '5%',
            align: 'right',
        },
        {
            content: 'Sub-Total',
            width: '25%',
            align: 'right',
        },
        {
            content: '',
            width: '5%',
            align: 'right',
        },
    ];

    // gets the initial values for collapsed form
    public static collapsedFormGetInitialValues = (
        product: ICartTableProduct,
    ): ICartTableFormValue => {
        const { productName, discountPercent, quantity, unitPrice } = product;
        return {
            productName,
            discountPercent,
            quantity,
            unitPrice,
        };
    };

    // checks if the values inside collapsed form has changed
    public static collapsedFormHasValuesChanged = (props: {
        values: ICartTableFormValue;
        product: ICartTableProduct;
    }): boolean => {
        const { product, values } = props;
        const { discountPercent, productName, quantity, unitPrice } = product;
        if (
            values.discountPercent !== discountPercent ||
            values.productName !== productName ||
            values.quantity !== quantity ||
            values.unitPrice !== unitPrice
        ) {
            return false;
        }
        return true;
    };

    // validation schema for the collapsed form
    private static collapsedFormValidationSchema = yup.object().shape({
        productName: yup.string().required('Product name is required'),
        quantity: yup.number().required('Quantity is required'),
        unitPrice: yup.number().required('Unit Price is required'),
        discountPercent: yup.number().required('Discount is required'),
    });

    // handles collapsed form validation
    public static validateCollapsedForm = async (
        values: ICartTableFormValue,
    ): Promise<AnyObject> => {
        try {
            await CartTableService.collapsedFormValidationSchema.validate(values, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = err.inner.reduce(
                (formError: AnyObject, innerError: { path: string; message: string }) => {
                    return setIn(formError, innerError.path, innerError.message);
                },
                {},
            );
            return errors;
        }
    };

    // handles collapsed form submission
    public static handleCollapsedFormSubmission = (props: {
        values: ICartTableFormValue;
        product: ICartTableProduct;
        toggleRowExpansion: (rowIndex: number) => void;
        productIndex: number;
    }): void => {
        const { product, productIndex, toggleRowExpansion, values } = props;
        const { discountPercent, productName, quantity, unitPrice } = values;
        const { stockUnit, taxBrackets } = product;
        // compiling product information
        const productData: ICartTableProduct = {
            stockUnit,
            taxBrackets,
            discountPercent,
            productName,
            quantity,
            unitPrice,
        };
        store.dispatch(
            updateCartProduct({
                productData,
                productIndex,
            }),
        );
        toggleRowExpansion(productIndex);
    };
}
