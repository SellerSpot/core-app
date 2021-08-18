import Icon from '@iconify/react';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { Button, IButtonProps, SliderModalFooter } from '@sellerspot/universal-components';
import { ISelectCategorySliderModalProps } from '../../SelectCategorySliderModal.types';
import { TreeItem } from 'react-sortable-tree';

type IModalFooterProps = Pick<ISelectCategorySliderModalProps, 'onClose' | 'onSubmit'> & {
    selectedCategory: TreeItem;
    treeData: TreeItem[];
};

export const ModalFooter = (props: IModalFooterProps): ReactElement => {
    // props
    const { onClose, onSubmit, selectedCategory, treeData } = props;

    // handlers
    const handleSecondaryButtonOnClick: IButtonProps['onClick'] = (event) => {
        onClose({
            event,
            source: 'button',
        });
    };
    const handleSubmit: IButtonProps['onClick'] = () => {
        onSubmit({ selectedCategory, treeData });
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
