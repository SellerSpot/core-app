import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import {
    IInventorySliderModalOnClose,
    IInventorySliderModalProps,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';
import Icon from '@iconify/react';
import { Button, IButtonProps, SliderModalFooter } from '@sellerspot/universal-components';

export type IModalFooterProps = Pick<IInventorySliderModalOnClose, 'dirty' | 'submitting'> &
    Pick<IInventorySliderModalProps, 'onClose'> &
    Pick<
        IInventorySliderModalDynamicValues,
        'modalFooterPrimaryButtonLabel' | 'modalFooterPrimaryButtonIcon'
    >;

export const ModalFooter = (props: IModalFooterProps): ReactElement => {
    // props
    const {
        dirty,
        modalFooterPrimaryButtonIcon,
        modalFooterPrimaryButtonLabel,
        onClose,
        submitting,
    } = props;

    // handlers
    const handleSecondaryButtonOnClick: IButtonProps['onClick'] = (event) => {
        onClose({
            dirty,
            event,
            source: 'button',
            submitting,
        });
    };

    // draw
    return (
        <SliderModalFooter>
            <Button
                label="CANCEL"
                theme="danger"
                size="large"
                variant="outlined"
                disabled={submitting}
                onClick={handleSecondaryButtonOnClick}
            />
            <Button
                label={modalFooterPrimaryButtonLabel}
                theme="primary"
                variant="contained"
                size="large"
                isLoading={submitting}
                type="submit"
                startIcon={<Icon icon={modalFooterPrimaryButtonIcon} />}
            />
        </SliderModalFooter>
    );
};
