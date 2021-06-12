import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import { IBrandsPageState } from 'pages/Catalogue/Brands/Brands.types';
import styles from './ModalBody.module.scss';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { BrandsSliderService } from '../../BrandsSlider.service';
import { IBrandsSliderForm } from '../../BrandsSlider.types';

const BrandNameField = (props: { autoFocus: boolean }) => {
    // props
    const { autoFocus } = props;
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

const ModalBody = (props: { sliderState: State<IBrandsPageState['slider']> }): ReactElement => {
    // props
    const { sliderState } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <BrandNameField autoFocus={sliderState.showSliderModal.get()} />
            </div>
        </SliderModalBody>
    );
};

export default ModalBody;
