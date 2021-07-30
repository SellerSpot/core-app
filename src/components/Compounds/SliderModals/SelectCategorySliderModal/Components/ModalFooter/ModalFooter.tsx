import Icon from '@iconify/react';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import {
    Button,
    IButtonProps,
    SliderModalFooter,
} from '../../../../../../../.yalc/@sellerspot/universal-components/dist';
import { ISelectCategorySliderModalProps } from '../../SelectCategorySliderModal.types';

type IModalFooterProps = Pick<ISelectCategorySliderModalProps, 'onClose' | 'onSubmit'>;

export const ModalFooter = (props: IModalFooterProps): ReactElement => {
    // props
    const { onClose, onSubmit } = props;

    // handlers
    const handleSecondaryButtonOnClick: IButtonProps['onClick'] = (event) => {
        onClose({
            event,
            source: 'button',
        });
    };
    const handleSubmit: IButtonProps['onClick'] = () => {
        onSubmit();
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
                label={'Confirm Selection'}
                theme="primary"
                variant="contained"
                onClick={handleSubmit}
                startIcon={<Icon icon={ICONS.check} />}
            />
        </SliderModalFooter>
    );
};
