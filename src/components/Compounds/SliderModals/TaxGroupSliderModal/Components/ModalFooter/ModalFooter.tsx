import React, { ReactElement } from 'react';
import { Button, IButtonProps, SliderModalFooter } from '@sellerspot/universal-components';
import {
    ITaxGroupSliderModalDynamicValues,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderModalProps,
} from '../../TaxGroupSliderModal.types';
import Icon from '@iconify/react';

export type IModalFooterProps = Pick<ITaxGroupSliderModalOnClose, 'dirty' | 'submitting'> &
    Pick<ITaxGroupSliderModalProps, 'onClose' | 'isPageOnStandby'> &
    Pick<
        ITaxGroupSliderModalDynamicValues,
        'modalFooterPrimaryButtonLabel' | 'modalFooterPrimaryButtonIcon'
    >;

export const ModalFooter = (props: IModalFooterProps): ReactElement => {
    // props
    const {
        dirty,
        onClose,
        submitting,
        modalFooterPrimaryButtonLabel,
        modalFooterPrimaryButtonIcon,
        isPageOnStandby,
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
                variant="outlined"
                disabled={submitting || isPageOnStandby}
                onClick={handleSecondaryButtonOnClick}
            />
            <Button
                label={modalFooterPrimaryButtonLabel}
                theme="primary"
                variant="contained"
                isLoading={submitting || isPageOnStandby}
                type="submit"
                startIcon={<Icon icon={modalFooterPrimaryButtonIcon} />}
            />
        </SliderModalFooter>
    );
};
