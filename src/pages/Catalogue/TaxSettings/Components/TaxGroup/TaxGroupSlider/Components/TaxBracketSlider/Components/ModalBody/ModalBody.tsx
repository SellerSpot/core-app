import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { TaxBracketSliderService } from '../../TaxBracketSlider.service';
import { ITaxBracketSliderState, ITaxBracketSliderForm } from '../../TaxBracketSlider.types';
import styles from './ModalBody.module.scss';

interface ITaxBracketNameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
}

interface ITaxBracketRateFieldProps {
    submitting: boolean;
}

interface IModalBodyProps {
    sliderState: State<ITaxBracketSliderState>;
    submitting: boolean;
}

const TaxBracketNameField = (props: ITaxBracketNameFieldProps) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof ITaxBracketSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: TaxBracketSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = TaxBracketSliderService.getSpecialInputFieldProps(meta);
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
            label="Bracket Name"
            helperMessage={helperMessage}
            placeHolder="Bracket Name"
        />
    );
};

const TaxBracketRateField = (props: ITaxBracketRateFieldProps) => {
    // props
    const { submitting } = props;
    const fieldName: keyof ITaxBracketSliderForm = 'rate';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: TaxBracketSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = TaxBracketSliderService.getSpecialInputFieldProps(meta);
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
            type="number"
            disabled={submitting}
            name={undefined}
            maxNumericValue={100}
            minNumericValue={0}
            fullWidth
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Bracket Rate"
            helperMessage={helperMessage}
            placeHolder="Bracket Rate"
        />
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { sliderState, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxBracketNameField
                    autoFocus={sliderState.showSliderModal.get()}
                    submitting={submitting}
                />
                <TaxBracketRateField submitting={submitting} />
            </div>
        </SliderModalBody>
    );
};
