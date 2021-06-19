import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { BrandSliderService } from '../../BrandSlider.service';
import { IBrandSliderState, IBrandSliderForm } from '../../BrandSlider.types';
import styles from './ModalBody.module.scss';

const BrandNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IBrandSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: BrandSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = BrandSliderService.getSpecialInputFieldProps(meta);
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
            label="Brand Name"
            helperMessage={helperMessage}
            placeHolder="Brand Name"
        />
    );
};

const ModalBody = (props: {
    sliderState: State<IBrandSliderState>;
    submitting: boolean;
}): ReactElement => {
    // props
    const { sliderState, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <BrandNameField
                    autoFocus={sliderState.showSliderModal.get()}
                    submitting={submitting}
                />
            </div>
        </SliderModalBody>
    );
};

export default ModalBody;
