import { State, useState } from '@hookstate/core';
import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    InputField,
    ISelectOption,
    SliderModalBody,
} from '@sellerspot/universal-components';
import { ITaxGroupData } from '@sellerspot/universal-types';
import React, { ReactElement } from 'react';
import { Field, useField } from 'react-final-form';
import { TaxGroupSliderService } from '../../TaxGroupSlider.service';
import { ITaxGroupSliderForm, ITaxGroupSliderState } from '../../TaxGroupSlider.types';
import styles from './ModalBody.module.scss';
import { default as ModalBodyService } from './ModalBody.service';

interface IModalBodyProps {
    sliderState: State<ITaxGroupSliderState>;
    allTaxGroup: ITaxGroupData[];
    submitting: boolean;
}

interface ITaxGroupNameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
}

// interface ITaxBracketSelect {
//     allTaxGroup: ITaxGroupData[];
// }

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

const TaxBracketSelect = () => {
    // state
    const isGettingOptions = useState(false);
    const fieldName: keyof ITaxGroupSliderForm = 'taxBrackets';

    // handlers
    const getOptions = async (searchQuery: string): Promise<ISelectOption[]> => {
        // setting state
        isGettingOptions.set(true);
        // request
        const matchingTaxBrackets = await ModalBodyService.searchTaxBrackets({ searchQuery });
        // props
        const fetchedOptions: ISelectOption[] = [];
        // compute
        matchingTaxBrackets.map((bracket) => {
            // props
            const { name, id, rate } = bracket;
            // compute
            fetchedOptions.push({
                label: `${name} - ${rate}%`,
                value: id,
            });
        });
        // setting state
        isGettingOptions.set(false);
        // return
        return fetchedOptions;
    };
    const getFormatCreateLabel: IAsyncCreatableSelectProps['formatCreateLabel'] = (value) => {
        return `Create a new tax bracket "${value}"`;
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
                const helperMessage: IAsyncCreatableSelectProps['helperMessage'] = {
                    enabled: specialInputFieldProps.enabled,
                    content: specialInputFieldProps.content,
                    type: specialInputFieldProps.type,
                };

                // draw
                return (
                    <AsyncCreatableSelect
                        label={'Tax Brackets'}
                        placeholder={'Choose the Tax Brackets'}
                        isLoading={isGettingOptions.get()}
                        value={value as ISelectOption[]}
                        formatCreateLabel={getFormatCreateLabel}
                        closeMenuOnSelect={false}
                        onChange={onChange}
                        helperMessage={helperMessage}
                        loadOptions={getOptions}
                        isMulti
                    />
                );
            }}
        </Field>
    );
};

const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { sliderState, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxGroupNameField
                    autoFocus={sliderState.showSliderModal.get()}
                    submitting={submitting}
                />
                <TaxBracketSelect />
            </div>
        </SliderModalBody>
    );
};

export default ModalBody;
