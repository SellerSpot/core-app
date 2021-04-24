import { ICONS } from 'utilities/icons';
import { numberFormatINRCurrency } from 'utilities/general';
import { computeDiscountUsingPercentage } from 'utilities/businessLogic';
import { Field, Form, FormSpy } from 'react-final-form';
import React, { ReactElement } from 'react';
import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import {
    ICartTableCollapsedFormProps,
    ICartTableCollapsedProps,
    ICartTableFormValue,
} from '../CartTable.types';
import { CartTableService } from '../CartTable.service';
import styles from '../CartTable.module.scss';

const CartTableCollapsedForm = (props: ICartTableCollapsedFormProps) => {
    const { product, productIndex, toggleRowExpansion, handleSubmit } = props;
    const { productName, quantity, discountPercent, unitPrice, stockUnit } = product;

    return (
        <form onSubmit={handleSubmit} className={styles.collapsedDiv} noValidate>
            <div className={styles.productName}>
                <Field
                    name={'productName'}
                    validate={(value) =>
                        CartTableService.validateCollapsedField(value, 'productName')
                    }
                >
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        const helperMessage: IInputFieldProps['helperMessage'] = {
                            enabled: error ? true : false,
                            content: error,
                            type: 'error',
                        };
                        return (
                            <InputField
                                label={'Product Name'}
                                fullWidth
                                theme="primary"
                                placeHolder={productName}
                                value={value}
                                helperMessage={helperMessage}
                                selectTextOnClick
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
            </div>
            <div className={styles.propertyRow}>
                <Field
                    name={'quantity'}
                    validate={(value) => CartTableService.validateCollapsedField(value, 'quantity')}
                >
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        const helperMessage: IInputFieldProps['helperMessage'] = {
                            enabled: error ? true : false,
                            content: error,
                            type: 'error',
                        };
                        return (
                            <InputField
                                label={'Quantity'}
                                type="number"
                                minNumericValue={0}
                                selectTextOnClick
                                placeHolder={`${quantity}`}
                                theme="primary"
                                suffix={<h6>{stockUnit}</h6>}
                                value={value}
                                helperMessage={helperMessage}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
                <Field
                    name={'unitPrice'}
                    validate={(value) =>
                        CartTableService.validateCollapsedField(value, 'unitPrice')
                    }
                >
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        const helperMessage: IInputFieldProps['helperMessage'] = {
                            enabled: error ? true : unitPrice !== value,
                            content: error ?? `Original: ${numberFormatINRCurrency(unitPrice)}`,
                            type: error ? 'error' : 'success',
                        };
                        return (
                            <InputField
                                type="number"
                                prefix={<h6>₹</h6>}
                                value={value}
                                minNumericValue={0}
                                placeHolder={`${unitPrice}`}
                                theme="primary"
                                selectTextOnClick
                                label={`Unit Price (per ${stockUnit})`}
                                helperMessage={helperMessage}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
                <Field
                    name={'discountPercent'}
                    validate={(value) =>
                        CartTableService.validateCollapsedField(value, 'discountPercent')
                    }
                >
                    {({ input, meta }) => {
                        const { onChange, value } = input;
                        const { error } = meta;
                        const helperMessage: IInputFieldProps['helperMessage'] = {
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
                        };
                        return (
                            <InputField
                                label={'Discount (%)'}
                                suffix={<h6>%</h6>}
                                type="number"
                                placeHolder={`${discountPercent}`}
                                maxNumericValue={100}
                                minNumericValue={0}
                                selectTextOnClick
                                theme="primary"
                                value={value}
                                onChange={onChange}
                                helperMessage={helperMessage}
                            />
                        );
                    }}
                </Field>
            </div>
            <div className={styles.collapsedDivActions}>
                <Button
                    theme="danger"
                    variant="outlined"
                    label={'CANCEL'}
                    onClick={() => toggleRowExpansion(productIndex)}
                />
                <FormSpy subscription={{ values: true }}>
                    {(values) => {
                        const formValues = values.values as ICartTableFormValue;
                        return (
                            <Button
                                theme="primary"
                                type="submit"
                                disabled={CartTableService.collapsedFormHasValuesChanged({
                                    values: formValues,
                                    product,
                                })}
                                variant="contained"
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

export const CartTableCollapsedContent = (props: ICartTableCollapsedProps): ReactElement => {
    const { product, productIndex, toggleRowExpansion } = props;

    // pushing form data into global store
    const handleFormSubmission = (values: ICartTableFormValue) => {
        CartTableService.handleCollapsedFormSubmission({
            product,
            productIndex,
            toggleRowExpansion,
            values,
        });
    };

    return (
        <div className={styles.collapsedDiv}>
            <Form
                initialValues={CartTableService.collapsedFormGetInitialValues(product)}
                onSubmit={handleFormSubmission}
                subscription={{}}
            >
                {({ handleSubmit }) => (
                    <CartTableCollapsedForm
                        product={product}
                        productIndex={productIndex}
                        toggleRowExpansion={toggleRowExpansion}
                        handleSubmit={handleSubmit}
                    />
                )}
            </Form>
        </div>
    );
};
