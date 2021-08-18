import React, { ReactElement } from 'react';
import { useField } from 'react-final-form';
import { IInputFieldProps, InputField, SliderModalBody } from '@sellerspot/universal-components';
import { CategorySliderModalService } from '../../CategorySliderModal.service';
import {
    ICategorySliderForm,
    ICategorySliderModalOnClose,
    ICategorySliderModalProps,
} from '../../CategorySliderModal.types';
import styles from './ModalBody.module.scss';

export type IModalBodyProps = Pick<ICategorySliderModalOnClose, 'submitting'> &
    Pick<ICategorySliderModalProps, 'showModal'> & {
        currentNodeSiblings: string[];
    };

interface ICategoryNameFieldProps {
    autoFocus: boolean;
    submitting: boolean;
    currentNodeSiblings: string[];
}

const CategoryNameField = (props: ICategoryNameFieldProps) => {
    // props
    const { autoFocus, submitting, currentNodeSiblings } = props;
    const fieldName: keyof ICategorySliderForm = 'name';

    // hooks
    const { input, meta } = useField(fieldName, {
        validate: CategorySliderModalService.validateField(fieldName, currentNodeSiblings),
        validateFields: [],
    });
    const { value } = input;

    // compute
    const specialInputFieldProps = CategorySliderModalService.getSpecialInputFieldProps(meta);
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
            label="Category Name"
            helperMessage={helperMessage}
            placeHolder="Bracket Name"
        />
    );
};

export const ModalBody = (props: IModalBodyProps): ReactElement => {
    // props
    const { showModal, submitting, currentNodeSiblings } = props;

    // draw
    return (
        <SliderModalBody>
            <div className={styles.modalBody}>
                <CategoryNameField
                    autoFocus={showModal}
                    submitting={submitting}
                    currentNodeSiblings={currentNodeSiblings}
                />
            </div>
        </SliderModalBody>
    );
};
