import React, { ReactElement } from 'react';
import { Button, IButtonProps, SliderModalFooter } from '@sellerspot/universal-components';
import {
    ITaxBracketSliderModalDynamicValues,
    ITaxBracketSliderModalOnClose,
    ITaxBracketSliderProps,
} from '../../TaxBracketSlider.types';
import Icon from '@iconify/react';

export type IModalFooterProps = Pick<ITaxBracketSliderModalOnClose, 'dirty' | 'submitting'> &
    Pick<ITaxBracketSliderProps, 'onClose'> &
    Pick<
        ITaxBracketSliderModalDynamicValues,
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
                onClick={handleSecondaryButtonOnClick}
            />
            <Button
                label={modalFooterPrimaryButtonLabel}
                theme="primary"
                variant="contained"
                isLoading={submitting}
                type="submit"
                startIcon={<Icon icon={modalFooterPrimaryButtonIcon} />}
            />
        </SliderModalFooter>
    );
};
