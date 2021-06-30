import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, SliderModalFooter } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxGroupSliderState } from '../../TaxGroupSlider.types';

export const ModalFooter = (props: {
    sliderState: State<ITaxGroupSliderState>;
    isFormDirty: boolean;
    isSubmitting: boolean;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, isFormDirty, showDialog, isSubmitting } = props;

    // compute
    let primaryButtonTitle = 'CREATE TAX GROUP';
    let primaryButtonIcon = ICONS.outlineAdd;

    if (sliderState.isEditMode.get()) {
        primaryButtonTitle = 'SAVE CHANGES';
        primaryButtonIcon = ICONS.check;
    }

    // handlers
    const handleSecondaryButtonOnClick = () => {
        if (isFormDirty) {
            showDialog.set(true);
        } else {
            sliderState.showSliderModal.set(false);
        }
    };

    // draw
    return (
        <SliderModalFooter>
            <Button
                label="CANCEL"
                theme="danger"
                disabled={isSubmitting}
                variant="outlined"
                onClick={handleSecondaryButtonOnClick}
            />
            <Button
                label={primaryButtonTitle}
                theme="primary"
                variant="contained"
                isLoading={isSubmitting}
                type="submit"
                startIcon={<Icon icon={primaryButtonIcon} />}
            />
        </SliderModalFooter>
    );
};
