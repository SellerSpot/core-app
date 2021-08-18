import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, IButtonProps, SliderModalFooter } from '@sellerspot/universal-components';
import {
    IInventorySliderModalOnClose,
    IInventorySliderModalProps,
    IInventorySliderModalState,
} from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';
import React, { ReactElement } from 'react';

export type IModalFooterProps = Pick<IInventorySliderModalOnClose, 'dirty' | 'submitting'> &
    Pick<IInventorySliderModalProps, 'onClose'> & {
        inventorySliderModalState: State<IInventorySliderModalState>;
    };

export const ModalFooter = (props: IModalFooterProps): ReactElement => {
    // props
    const { dirty, inventorySliderModalState, onClose, submitting } = props;

    // handlers
    const handleSecondaryButtonOnClick: IButtonProps['onClick'] = (event) => {
        onClose({
            dirty,
            event,
            source: 'button',
            submitting,
        });
    };

    const showFooter = !!inventorySliderModalState.outletsToShow.get().length;

    // draw
    return showFooter ? (
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
                label={inventorySliderModalState.dynamicValues.modalFooterPrimaryButtonLabel.get()}
                theme="primary"
                variant="contained"
                size="large"
                isLoading={submitting}
                type="submit"
                startIcon={
                    <Icon
                        icon={inventorySliderModalState.dynamicValues.modalFooterPrimaryButtonIcon.get()}
                    />
                }
            />
        </SliderModalFooter>
    ) : null;
};
