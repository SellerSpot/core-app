import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, SliderModalFooter } from '@sellerspot/universal-components';
import { IBrandsPageState } from 'pages/Catalogue/Brands/Brands.types';
import React, { ReactElement } from 'react';
import { FormSpy } from 'react-final-form';
import { ICONS } from 'utilities/utilities';

const ModalFooter = (props: { sliderState: State<IBrandsPageState['slider']> }): ReactElement => {
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

export default ModalFooter;
