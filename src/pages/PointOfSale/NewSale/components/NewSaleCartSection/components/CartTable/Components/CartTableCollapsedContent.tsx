import { ICONS } from 'utilities/utilities';
import { numberFormatINRCurrency, rawClone } from 'utilities/general';
import { Field, Form, FormSpy } from 'react-final-form';
import React, { ReactElement } from 'react';
import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import {
    ICartTableCollapsedFormProps,
    ICartTableCollapsedProps,
    ICartTableFormValues,
} from '../CartTable.types';
import { CartTableService } from '../CartTable.service';
import styles from '../CartTable.module.scss';
import { saleService } from 'services/services';
import Icon from '@iconify/react';
import { ICartDetails } from '@sellerspot/universal-types';

const CartTableCollapsedForm = (props: ICartTableCollapsedFormProps) => {
    const { formValues, product, handleCancel, handleSubmit } = props;
    const { quantity, unitPrice } = formValues;
    const {
        stockUnit: { name: stockUnit },
        productDiscount,
    } = product.get();

    return (
        <form onSubmit={handleSubmit} className={styles.collapsedDiv} noValidate>
            <div className={styles.propertyRow}>
                <Field
                    name="quantity"
                    type="number"
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
                                type="number"
                                label="Quantity"
                                minNumericValue={1}
                                selectTextOnFocus
                                placeHolder={`${quantity}`}
                                theme="primary"
                                suffix={<h6>{stockUnit}</h6>}
                                value={value}
                                helperMessage={helperMessage}
                                onChange={(e) => {
                                    console.log(typeof e.target.value, e.target.value);
                                    onChange(e);
                                }}
                            />
                        );
                    }}
                </Field>
                <Field
                    name="unitPrice"
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
                                selectTextOnFocus
                                label={`Unit Price (per ${stockUnit})`}
                                helperMessage={helperMessage}
                                onChange={onChange}
                            />
                        );
                    }}
                </Field>
                <Field
                    name="discountPercent"
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
                                    saleService.computeDiscount({
                                        unitPrice,
                                        discount: productDiscount,
                                    }),
                                )}`,
                            type: error ? 'error' : 'success',
                        };
                        return (
                            <InputField
                                label={'Discount (%)'}
                                suffix={<h6>%</h6>}
                                type="number"
                                placeHolder={`${productDiscount.discount}`}
                                maxNumericValue={100}
                                minNumericValue={0}
                                selectTextOnFocus
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
                <Button theme="danger" variant="outlined" label={'CANCEL'} onClick={handleCancel} />
                <FormSpy subscription={{ values: true }}>
                    {(values) => {
                        const changedValues = values.values as ICartTableFormValues;
                        return (
                            <Button
                                theme="primary"
                                type="submit"
                                disabled={CartTableService.collapsedFormHasValuesChanged({
                                    originalvalues: formValues,
                                    changedValues,
                                })}
                                variant="contained"
                                label={'UPDATE'}
                                startIcon={<Icon icon={ICONS.check} />}
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
    const rawClonedProduct = rawClone<ICartDetails>(product.get());

    // handlers
    // pushing the changes to the product state on completion
    const handleFormSubmission = (values: ICartTableFormValues) => {
        CartTableService.handleCollapsedFormSubmission({
            cartItemIndex: productIndex,
            values,
            toggleRowExpansion,
        });
    };
    const handleCancel = () => {
        toggleRowExpansion(productIndex);
    };

    // compute
    const initialFormValues = CartTableService.collapsedFormGetInitialValues(rawClonedProduct);

    // draw
    return (
        <div className={styles.collapsedDiv}>
            <Form
                initialValues={CartTableService.collapsedFormGetInitialValues(rawClonedProduct)}
                onSubmit={handleFormSubmission}
                subscription={{}}
            >
                {({ handleSubmit }) => (
                    <CartTableCollapsedForm
                        product={product}
                        formValues={initialFormValues}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                    />
                )}
            </Form>
        </div>
    );
};
