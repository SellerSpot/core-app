import React, { ReactElement } from 'react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import {
    IBrandSliderForm,
    IBrandSliderModalOnClose,
    IBrandSliderModalProps,
} from '../../BrandSliderModal.types';
import styles from './ModalBody.module.scss';
import { useField } from 'react-final-form';
import { BrandSliderModalService } from '../../BrandSliderModal.service';

export type IModalBodyProps = Pick<IBrandSliderModalOnClose, 'submitting'> &
    Pick<IBrandSliderModalProps, 'showModal'>;

const BrandNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IBrandSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: BrandSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = BrandSliderModalService.getSpecialInputFieldProps(meta);
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

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { showModal, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <BrandNameField autoFocus={showModal} submitting={submitting} />
            </div>
        </SliderModalBody>
    );
};
