import React, { ReactElement } from 'react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import {
    IProductSliderForm,
    IProductSliderModalOnClose,
    IProductSliderProps,
} from '../../ProductSlider.types';
import styles from './ModalBody.module.scss';
import { useField } from 'react-final-form';
import { ProductSliderService } from '../../ProductSlider.service';

export type IModalBodyProps = Pick<IProductSliderModalOnClose, 'submitting'> &
    Pick<IProductSliderProps, 'showModal'>;

const ProductNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
    // props
    const { autoFocus, submitting } = props;
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

const ProductRateField = (props: { submitting: boolean }) => {
    // props
    const { submitting } = props;
    const fieldName: keyof IProductSliderForm = 'rate';

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
    const { showModal, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <ProductNameField autoFocus={showModal} submitting={submitting} />
                <ProductRateField submitting={submitting} />
            </div>
        </SliderModalBody>
    );
};
