import { State } from '@hookstate/core';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { ProductSliderService } from '../../ProductSlider.service';
import { IProductSliderForm, IProductSliderState } from '../../ProductSlider.types';
import styles from './ModalBody.module.scss';

const ProductNameField = (props: { autoFocus: boolean }) => {
    // props
    const { autoFocus } = props;
    const fieldName: keyof IProductSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = ProductSliderService.getSpecialInputFieldProps(meta);
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
            theme={specialInputFieldProps.theme}
            label="Product Name"
            helperMessage={helperMessage}
        />
    );
};

const BarcodeField = () => {
    // props
    const fieldName: keyof IProductSliderForm = 'barcode';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: ProductSliderService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = ProductSliderService.getSpecialInputFieldProps(meta);
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
            fullWidth
            theme={specialInputFieldProps.theme}
            label="Barcode"
            helperMessage={helperMessage}
        />
    );
};

export const ModalBody = (props: { sliderState: State<IProductSliderState> }): ReactElement => {
    // props
    const { sliderState } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <ProductNameField autoFocus={sliderState.showSliderModal.get()} />
                <BarcodeField />
            </div>
        </SliderModalBody>
    );
};
