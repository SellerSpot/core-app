import {
    CreatableSelect,
    ICreatableSelectProps,
    IInputFieldProps,
    InputField,
    ISelectOption,
    SliderModalBody,
} from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { Field, useField } from 'react-final-form';
import { TaxGroupSliderModalService } from '../../TaxGroupSliderModal.service';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderModalProps,
} from '../../TaxGroupSliderModal.types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<ITaxGroupSliderModalOnClose, 'submitting'> &
    Pick<
        ITaxGroupSliderModalProps,
        'showModal' | 'allTaxBrackets' | 'onCreateTaxBracket' | 'isPageOnStandby'
    >;

interface ITaxGroupNameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
    isPageOnStandby: boolean;
}

type ITaxGroupSelectProps = Pick<ITaxGroupSliderModalOnClose, 'submitting'> &
    Pick<ITaxGroupSliderModalProps, 'allTaxBrackets' | 'onCreateTaxBracket' | 'isPageOnStandby'>;

const TaxGroupNameField = (props: ITaxGroupNameFieldProps) => {
    // props
    const { autoFocus, submitting, isPageOnStandby } = props;
    const fieldName: keyof ITaxGroupSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: TaxGroupSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = TaxGroupSliderModalService.getSpecialInputFieldProps(
        meta as string,
    );
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value as string}
            type="text"
            disabled={submitting || isPageOnStandby}
            name={undefined}
            autoFocus={autoFocus}
            fullWidth
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Group Name"
            helperMessage={helperMessage}
            placeHolder="Group Name"
        />
    );
};

const TaxGroupSelect = (props: ITaxGroupSelectProps) => {
    // props
    const { submitting, allTaxBrackets, onCreateTaxBracket, isPageOnStandby } = props;
    const fieldName: keyof ITaxGroupSliderForm = 'bracket';

    // compute
    const allOptions = TaxGroupSliderModalService.convertTaxBracketDataToISelectOption({
        brackets: allTaxBrackets,
    });
    const getFormatCreateLabel: ICreatableSelectProps['formatCreateLabel'] = (value) => {
        return `Create a new tax Group "${value}"`;
    };

    // draw
    return (
        <Field name={fieldName} validate={TaxGroupSliderModalService.validateField(fieldName)}>
            {({ input, meta }) => {
                // props
                const { value, onChange } = input;

                // compute
                const specialInputFieldProps =
                    TaxGroupSliderModalService.getSpecialSelectFieldProps(meta as string);
                const helperMessage: ICreatableSelectProps['helperMessage'] = {
                    enabled: specialInputFieldProps.enabled,
                    content: specialInputFieldProps.content,
                    type: specialInputFieldProps.type,
                };

                // draw
                return (
                    <CreatableSelect
                        closeMenuOnSelect={false}
                        label={'Tax Groups'}
                        placeholder={'Choose the Tax Groups'}
                        isDisabled={submitting || isPageOnStandby}
                        value={value as ISelectOption[]}
                        helperMessage={helperMessage}
                        formatCreateLabel={getFormatCreateLabel}
                        onChange={onChange}
                        options={allOptions}
                        onCreateOption={onCreateTaxBracket}
                        isMulti
                    />
                );
            }}
        </Field>
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { showModal, submitting, allTaxBrackets, onCreateTaxBracket, isPageOnStandby } = props;

    // compiling data
    const taxGroupNameFieldProps: ITaxGroupNameFieldProps = {
        autoFocus: showModal,
        isPageOnStandby,
        submitting,
    };
    const taxGroupSelectProps: ITaxGroupSelectProps = {
        allTaxBrackets,
        isPageOnStandby,
        onCreateTaxBracket,
        submitting,
    };

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxGroupNameField {...taxGroupNameFieldProps} />
                <TaxGroupSelect {...taxGroupSelectProps} />
            </div>
        </SliderModalBody>
    );
};