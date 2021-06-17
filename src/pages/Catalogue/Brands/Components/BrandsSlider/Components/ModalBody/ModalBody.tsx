import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { BrandsSliderService } from '../../BrandsSlider.service';
import { IBrandSliderState, IBrandsSliderForm } from '../../BrandsSlider.types';
import styles from './ModalBody.module.scss';

const BrandNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IBrandsSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: BrandsSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = BrandsSliderService.getSpecialInputFieldProps(meta);
    const helperMessage: IInputFieldProps['helperMessage'] = {
        enabled: specialInputFieldProps.enabled,
        content: specialInputFieldProps.content,
        type: specialInputFieldProps.type,
    };

    // draw
    return (
        <InputField
            {...input}
            value={value.name}
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
