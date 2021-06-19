import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, SliderModalFooter } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { FormSpy } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { ITaxBracketSliderState } from '../../TaxBracketSlider.types';

const ModalFooter = (props: {
    sliderState: State<ITaxBracketSliderState>;
    formDirty: State<boolean>;
    showDialog: State<boolean>;
}): ReactElement => {
    // props
    const { sliderState, formDirty, showDialog } = props;

    // compute
    let primaryButtonTitle = 'CREATE STOCK UNIT';
    let primaryButtonIcon = ICONS.outlineAdd;

    if (sliderState.isEditMode.get()) {
        primaryButtonTitle = 'SAVE CHANGES';
        primaryButtonIcon = ICONS.check;
    }

    // handlers
    const handleSecondaryButtonOnClick = () => {
        if (formDirty.get()) {
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
                variant="outlined"
                onClick={handleSecondaryButtonOnClick}
            />
            <FormSpy subscription={{ submitting: true }}>
                {({ submitting }) => {
                    return (
                        <Button
                            label={primaryButtonTitle}
                            theme="primary"
                            variant="contained"
                            isLoading={submitting}
                            type="submit"
                            startIcon={<Icon icon={primaryButtonIcon} />}
                        />
                    );
                }}
            </FormSpy>
        </SliderModalFooter>
    );
};

export default ModalFooter;
