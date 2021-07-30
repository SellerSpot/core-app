import React, { ReactElement } from 'react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import {
    ITaxBracketSliderForm,
    ITaxBracketSliderModalOnClose,
    ITaxBracketSliderModalProps,
} from '../../TaxBracketSliderModal.types';
import styles from './ModalBody.module.scss';
import { useField } from 'react-final-form';
import { TaxBracketSliderService } from '../../TaxBracketSliderModal.service';

export type IModalBodyProps = Pick<ITaxBracketSliderModalOnClose, 'submitting'> &
    Pick<ITaxBracketSliderModalProps, 'showModal'>;

const TaxBracketNameField = (props: { autoFocus: boolean; submitting: boolean }) => {
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

const TaxBracketRateField = (props: { submitting: boolean }) => {
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
    const { showModal, submitting } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <TaxBracketNameField autoFocus={showModal} submitting={submitting} />
                <TaxBracketRateField submitting={submitting} />
            </div>
        </SliderModalBody>
    );
};
