import React, { ReactElement } from 'react';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import {
    IStockUnitSliderForm,
    IStockUnitSliderModalOnClose,
    IStockUnitSliderModalProps,
} from '../../StockUnitSliderModal.types';
import styles from './ModalBody.module.scss';
import { useField } from 'react-final-form';
import { StockUnitSliderModalService } from '../../StockUnitSliderModal.service';

export type IModalBodyProps = Pick<IStockUnitSliderModalOnClose, 'submitting'> &
    Pick<IStockUnitSliderModalProps, 'showModal'>;

interface INameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
}

interface IUnitFieldProps {
    submitting: boolean;
}

const NameField = (props: INameFieldProps) => {
    // props
    const { autoFocus, submitting } = props;
    const fieldName: keyof IStockUnitSliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: StockUnitSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = StockUnitSliderModalService.getSpecialInputFieldProps(meta);
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
            label="Name"
            helperMessage={helperMessage}
            placeHolder="Bracket Name"
        />
    );
};

const UnitField = (props: IUnitFieldProps) => {
    // props
    const { submitting } = props;
    const fieldName: keyof IStockUnitSliderForm = 'unit';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: StockUnitSliderModalService.validateField(fieldName),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = StockUnitSliderModalService.getSpecialInputFieldProps(meta);
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
            fullWidth
            size="medium"
            theme={specialInputFieldProps.theme}
            label="Unit"
            helperMessage={helperMessage}
            placeHolder="Eg. kg, pcs(s), gram, etc..."
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
                <NameField autoFocus={showModal} submitting={submitting} />
                <UnitField submitting={submitting} />
            </div>
        </SliderModalBody>
    );
};
