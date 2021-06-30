import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button, SliderModalFooter } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { FormSpy } from 'react-final-form';
import { ICONS } from 'utilities/utilities';
import { ITaxBracketSliderState } from '../../TaxBracketSlider.types';

interface IModalFooter {
    sliderState: State<ITaxBracketSliderState>;
}

export const ModalFooter = (props: IModalFooter): ReactElement => {
    // props
    const { sliderState } = props;

    // handlers
    const handleSecondaryButtonOnClick = () => {
        sliderState.showSliderModal.set(false);
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
                            label="CREATE TAX BRACKET"
                            theme="primary"
                            variant="contained"
                            isLoading={submitting}
                            type="submit"
                            startIcon={<Icon icon={ICONS.outlineAdd} />}
                        />
                    );
                }}
            </FormSpy>
        </SliderModalFooter>
    );
};
