import * as yup from 'yup';
import { store } from 'store/store';
import { updateCartProduct } from 'store/models/cart';
import { ICartTableFormValue, ICartTableProduct } from './CartTable.types';

export class CartTableService {
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
    public static validateCollapsedField = (
        values: ICartTableFormValue,
        fieldPath: keyof ICartTableProduct,
    ): string => {
        // getting the right schema to use for validation
        const requiredSchema = yup.reach(CartTableService.collapsedFormValidationSchema, fieldPath);
        try {
            requiredSchema.validateSync(values, {
                abortEarly: false,
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
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
