import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, SliderModalFooter } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { FormSpy } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { IProductSliderState } from '../../ProductSlider.types';

export const ModalFooter = (props: { sliderState: State<IProductSliderState> }): ReactElement => {
    // props
    const { sliderState } = props;

    // compute
    let primaryButtonTitle = 'SAVE CHANGES';
    let primaryButtonIcon = ICONS.check;
    if (sliderState.isEditMode.get()) {
        primaryButtonTitle = 'CREATE';
        primaryButtonIcon = ICONS.outlineAdd;
    }

    // draw
    return (
        <SliderModalFooter>
            <Button label="CANCEL" theme="danger" variant="outlined" />
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
