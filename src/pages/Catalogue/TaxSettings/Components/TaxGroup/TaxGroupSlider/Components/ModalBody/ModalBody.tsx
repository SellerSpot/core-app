import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { TaxGroupSliderService } from '../../TaxGroupSlider.service';
import { ITaxGroupSliderForm, ITaxGroupSliderState } from '../../TaxGroupSlider.types';
import styles from './ModalBody.module.scss';

const TaxGroupNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
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
    const specialInputFieldProps = TaxGroupSliderService.getSpecialInputFieldProps(meta);
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value}
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

// const TaxBracketSelect = () => {
//     // draw
//     return <Select options={} />;
// };

const ModalBody = (props: {
    sliderState: State<ITaxGroupSliderState>;
    submitting: boolean;
}): ReactElement => {
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
            </div>
        </SliderModalBody>
    );
};

export default ModalBody;
