import * as yup from 'yup';
import { ICartTableFormValues } from './CartTable.types';
import { EDiscountTypes, ICartDetails } from '@sellerspot/universal-types';
import { isEqual } from 'lodash';
import { State } from '@hookstate/core';

export class CartTableService {
    // gets the initial values for collapsed form
    public static collapsedFormGetInitialValues = (product: ICartDetails): ICartTableFormValues => {
        const {
            product: { name: productName },
            productDiscount: { discount: discountPercent },
            quantity,
            unitPrice,
        } = product;
        return {
            productName,
            discountPercent,
            quantity,
            unitPrice,
        };
    };

    // checks if the values inside collapsed form has changed
    public static collapsedFormHasValuesChanged = (props: {
        originalvalues: ICartTableFormValues;
        changedValues: ICartTableFormValues;
    }): boolean => {
        const { originalvalues, changedValues } = props;
        const modifiedValues: ICartTableFormValues = {
            productName: changedValues.productName,
            discountPercent: +changedValues.discountPercent,
            quantity: +changedValues.quantity,
            unitPrice: +changedValues.unitPrice,
        };
        if (!isEqual(originalvalues, modifiedValues)) {
            return false;
        }
        return true;
    };

    // validation schema for the collapsed form
    private static collapsedFormValidationSchema = yup.object().shape({
        productName: yup.string().required('Product name is required'),
        quantity: yup.number().min(1).required('Quantity is required'),
        unitPrice: yup.number().required('Unit Price is required'),
        discountPercent: yup.number().required('Discount is required'),
    });

    // handles collapsed form validation
    public static validateCollapsedField = (
        values: ICartTableFormValues,
        fieldPath: keyof ICartTableFormValues,
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
        product: State<ICartDetails>;
        values: ICartTableFormValues;
        toggleRowExpansion: (rowIndex: number) => void;
        productIndex: number;
    }): void => {
        const { product, productIndex, toggleRowExpansion, values } = props;
        // compiling product information
        const modifiedValues: ICartTableFormValues = {
            productName: values.productName,
            discountPercent: +values.discountPercent,
            quantity: +values.quantity,
            unitPrice: +values.unitPrice,
        };
        // updating the product
        product.batch((state) => {
            state.product.name.set(modifiedValues.productName);
            state.productDiscount.set({
                discount: modifiedValues.discountPercent,
                discountType: EDiscountTypes.PERCENT,
            });
            state.quantity.set(modifiedValues.quantity);
            state.unitPrice.set(modifiedValues.unitPrice);
        });
        toggleRowExpansion(productIndex);
    };
}
