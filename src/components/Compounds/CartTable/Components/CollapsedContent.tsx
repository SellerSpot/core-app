import { Button, InputField } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { AnyObject, Field, Form, FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { updateCartProduct } from 'store/models/cart';
import { computeDiscountUsingPercentage } from 'utilities/businessLogic';
import { numberFormatINRCurrency } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import styles from '../CartTable.module.scss';
import {
    ICartFormFormik,
    ICartProductsData,
    ICollapsedContentProps,
    IFormItemsProps,
} from '../CartTable.types';
import * as yup from 'yup';
import { setIn } from 'final-form';

const FormItems = (props: IFormItemsProps) => {
    const { product, productIndex, toggleRowExpansion, handleSubmit } = props;
    const { productName, quantity, discountPercent, unitPrice, stockUnit, taxBrackets } = product;

    // used to check if the editable values have been changed
    const hasEditableValuesChanged = (values: ICartFormFormik): boolean => {
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

    return (
        <form onSubmit={handleSubmit} className={styles.collapsedDiv} noValidate>
            <div className={styles.productName}>
                <Field name={'productName'}>
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        return (
                            <InputField
                                label="Product Name"
                                fullWidth={true}
                                required={true}
                                theme="primary"
                                placeHolder={productName}
                                value={value}
                                helperMessage={{
                                    enabled: error ? true : false,
                                    content: error,
                                    type: 'error',
                                }}
                                selectTextOnClick={true}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
            </div>
            <div className={styles.propertyRow}>
                <Field name={'quantity'}>
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        return (
                            <InputField
                                label={'Quantity'}
                                type={'number'}
                                minNumericValue={0}
                                required={true}
                                selectTextOnClick={true}
                                placeHolder={quantity + ''}
                                theme={'primary'}
                                suffix={<h6>{stockUnit}</h6>}
                                value={value}
                                helperMessage={{
                                    enabled: error ? true : false,
                                    content: error,
                                    type: 'error',
                                }}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
                <Field name={'unitPrice'}>
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        return (
                            <InputField
                                type={'number'}
                                prefix={<h6>₹</h6>}
                                value={value}
                                minNumericValue={0}
                                required={true}
                                placeHolder={unitPrice + ''}
                                theme={'primary'}
                                selectTextOnClick={true}
                                label={`Unit Price (per ${stockUnit})`}
                                helperMessage={{
                                    enabled: error ? true : unitPrice !== value,
                                    content:
                                        error ?? `Original: ${numberFormatINRCurrency(unitPrice)}`,
                                    type: error ? 'error' : 'success',
                                }}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
                <Field name={'discountPercent'}>
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        return (
                            <InputField
                                label={'Discount (%)'}
                                suffix={<h6>%</h6>}
                                type={'number'}
                                required={true}
                                placeHolder={discountPercent + ''}
                                maxNumericValue={100}
                                minNumericValue={0}
                                selectTextOnClick={true}
                                theme={'primary'}
                                value={value}
                                onChange={onChange}
                                helperMessage={{
                                    enabled: error ? true : value > 0,
                                    content:
                                        error ??
                                        `- ${numberFormatINRCurrency(
                                            computeDiscountUsingPercentage({
                                                unitPrice,
                                                discountPercent: value,
                                            }),
                                        )}`,
                                    type: error ? 'error' : 'success',
                                }}
                            />
                        );
                    }}
                </Field>
            </div>
            <div className={styles.collapsedDivActions}>
                <Button
                    theme={'danger'}
                    variant={'outlined'}
                    label={'CANCEL'}
                    onClick={() => toggleRowExpansion(productIndex)}
                />
                <FormSpy subscription={{ values: true }}>
                    {(values) => {
                        const formValues = values.values as ICartFormFormik;
                        return (
                            <Button
                                theme={'primary'}
                                type={'submit'}
                                disabled={hasEditableValuesChanged(formValues)}
                                variant={'contained'}
                                label={'UPDATE'}
                                startIcon={<ICONS.MdCheck />}
                            />
                        );
                    }}
                </FormSpy>
            </div>
        </form>
    );
};

const cartFormValidationSchema: yup.SchemaOf<ICartFormFormik> = yup.object().shape({
    productName: yup.string().required('Product name is required'),
    quantity: yup.number().required('Quantity is required'),
    unitPrice: yup.number().required('Unit Price is required'),
    discountPercent: yup.number().required('Discount is required'),
});

// callback to validate the form
const validateForm = async (values: ICartFormFormik) => {
    try {
        await cartFormValidationSchema.validate(values, { abortEarly: false });
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

export const CollapsedContent = (props: ICollapsedContentProps): ReactElement => {
    const { product, productIndex, toggleRowExpansion } = props;
    const { productName, quantity, discountPercent, unitPrice, stockUnit, taxBrackets } = product;
    const dispatch = useDispatch();
    const cartFormFormikInitialValues: ICartFormFormik = {
        productName,
        discountPercent,
        quantity,
        unitPrice,
    };

    // handles form submission
    const handleFormSubmission = (values: ICartFormFormik) => {
        const { discountPercent, productName, quantity, unitPrice } = values;
        // compiling product information
        const productData: ICartProductsData = {
            stockUnit,
            taxBrackets,
            discountPercent,
            productName,
            quantity,
            unitPrice,
        };
        dispatch(
            updateCartProduct({
                productData,
                productIndex,
            }),
        );
        toggleRowExpansion(productIndex);
    };

    return (
        <div className={styles.collapsedDiv}>
            <Form
                initialValues={cartFormFormikInitialValues}
                onSubmit={handleFormSubmission}
                validate={validateForm}
                subscription={{
                    values: false,
                }}
                render={({ handleSubmit }) => (
                    <FormItems
                        product={product}
                        productIndex={productIndex}
                        toggleRowExpansion={toggleRowExpansion}
                        handleSubmit={handleSubmit}
                    />
                )}
            />
        </div>
    );
};
