import {
    AsyncCreatableSelect,
    IAsyncCreatableSelectProps,
    ICreatableSelectProps,
    IInputFieldProps,
    InputField,
    ISelectOption,
    SliderModalBody,
} from '@sellerspot/universal-components';
import { TaxBracketSectionService } from 'pages/Catalogue/TaxSetting/Components/TaxBracketSection/TaxBracketSection.service';
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
    Pick<ITaxGroupSliderModalProps, 'showModal'> & {
        onCreateTaxBracket: (value: string) => void;
    };

type ITaxGroupNameFieldProps = Pick<IModalBodyProps, 'submitting'> & {
    autoFocus: boolean;
};

type ITaxBracketSelectProps = Pick<IModalBodyProps, 'submitting' | 'onCreateTaxBracket'>;

const TaxGroupNameField = (props: ITaxGroupNameFieldProps) => {
    // props
    const { autoFocus, submitting } = props;
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

const TaxBracketSelect = (props: ITaxBracketSelectProps) => {
    // props
    const { submitting, onCreateTaxBracket } = props;
    const fieldName: keyof ITaxGroupSliderForm = 'bracket';

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

                // handlers
                const loadOptionsHandler: IAsyncCreatableSelectProps['loadOptions'] = async (
                    loadQuery,
                ): Promise<ISelectOption[]> => {
                    const searchResults = await TaxBracketSectionService.searchTaxBracket(
                        loadQuery,
                    );
                    return TaxGroupSliderModalService.convertTaxBracketDataToISelectOption({
                        brackets: searchResults,
                    });
                };
                const formatOptionLabelHandler: IAsyncCreatableSelectProps['formatOptionLabel'] = (
                    option,
                ) => {
                    const { label, meta } = option as ISelectOption<number>;
                    // used to modify label when meta is not available for the create
                    if (!!meta) {
                        return `${label} (${meta})%`;
                    } else {
                        return label;
                    }
                };
                const formatCreateLabelHandler: IAsyncCreatableSelectProps['formatCreateLabel'] = (
                    label,
                ) => {
                    return `Create a new tax bracket "${label}"`;
                };

                // draw
                return (
                    <AsyncCreatableSelect
                        loadOptions={loadOptionsHandler}
                        closeMenuOnSelect={false}
                        label={'Tax Groups'}
                        formatOptionLabel={formatOptionLabelHandler}
                        placeholder={'Choose the Tax Groups'}
                        isDisabled={submitting}
                        value={value as ISelectOption<number>[]}
                        helperMessage={helperMessage}
                        formatCreateLabel={formatCreateLabelHandler}
                        onChange={onChange}
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
    const { showModal, submitting, onCreateTaxBracket } = props;

    // compiling data
    const taxGroupNameFieldProps: ITaxGroupNameFieldProps = {
        autoFocus: showModal,
        submitting,
    };
    const taxBracketSelectProps: ITaxBracketSelectProps = {
        onCreateTaxBracket,
        submitting,
    };

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxGroupNameField {...taxGroupNameFieldProps} />
                <TaxBracketSelect {...taxBracketSelectProps} />
            </div>
        </SliderModalBody>
    );
};
