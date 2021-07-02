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
import { TaxGroupSliderService } from '../../TaxGroupSlider.service';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderProps,
} from '../../TaxGroupSlider.types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<ITaxGroupSliderModalOnClose, 'submitting'> &
    Pick<ITaxGroupSliderProps, 'showModal' | 'allBrackets' | 'onCreateTaxBracket'>;

interface ITaxGroupNameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
}

type ITaxGroupSelectProps = Pick<ITaxGroupSliderModalOnClose, 'submitting'> &
    Pick<ITaxGroupSliderProps, 'allBrackets' | 'onCreateTaxBracket'>;

const TaxGroupNameField = (props: ITaxGroupNameFieldProps) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof ITaxGroupSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: TaxGroupSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = TaxGroupSliderService.getSpecialInputFieldProps(meta as string);
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
            disabled={submitting}
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
    const { submitting, allBrackets, onCreateTaxBracket } = props;
    const fieldName: keyof ITaxGroupSliderForm = 'bracket';

    // compute
    const allOptions = TaxGroupSliderService.convertTaxBracketDataToISelectOption(allBrackets);
    const getFormatCreateLabel: ICreatableSelectProps['formatCreateLabel'] = (value) => {
        return `Create a new tax Group "${value}"`;
    };

    // draw
    return (
        <Field name={fieldName} validate={TaxGroupSliderService.validateField(fieldName)}>
            {({ input, meta }) => {
                // props
                const { value, onChange } = input;

                // compute
                const specialInputFieldProps = TaxGroupSliderService.getSpecialSelectFieldProps(
                    meta as string,
                );
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
                        isDisabled={submitting}
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
    const { showModal, submitting, allBrackets, onCreateTaxBracket } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxGroupNameField autoFocus={showModal} submitting={submitting} />
                <TaxGroupSelect
                    submitting={submitting}
                    allBrackets={allBrackets}
                    onCreateTaxBracket={onCreateTaxBracket}
                />
            </div>
        </SliderModalBody>
    );
};
