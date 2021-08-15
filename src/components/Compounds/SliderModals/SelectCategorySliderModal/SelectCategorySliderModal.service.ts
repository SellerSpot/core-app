import { State } from '@hookstate/core';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { TreeItem } from 'react-sortable-tree';
import { ISliderModalProps } from '@sellerspot/universal-components/dist';
import {
    ISelectCategorySliderModalDynamicProps,
    ISelectCategorySliderModalOnClose,
    ISelectCategorySliderModalProps,
} from './SelectCategorySliderModal.types';

type IGetDynamicProps = Pick<ISelectCategorySliderModalProps, 'level'>;

interface IHandleOnCloseSelectCategorySliderModalProps {
    onCloseProps: ISelectCategorySliderModalOnClose;
    sliderModalState: {
        showModal: State<ISelectCategorySliderModalProps['showModal']>;
        selectedCategory: State<TreeItem>;
    };
}

export class SelectCategorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): ISelectCategorySliderModalDynamicProps => {
        // props
        const { level } = props;

        // variables
        let type: ISliderModalProps['type'] = 'fixed';
        let width: ISliderModalProps['width'] = '30%';
        let closeButtonType: ISelectCategorySliderModalDynamicProps['closeButtonType'] = 'close';

        // setting type
        if (level === 2) {
            type = 'absolute';
        }

        // setting width
        if (level === 2) {
            width = '100%';
        }

        // setting closeButtonType
        if (level === 2) {
            closeButtonType = 'back';
        }

        // return
        return {
            type,
            width,
            closeButtonType,
        };
    };

    static handleOnCloseSelectCategorySliderModal = async (
        props: IHandleOnCloseSelectCategorySliderModalProps,
    ): Promise<void> => {
        // props
        const { onCloseProps, sliderModalState } = props;
        const { event } = onCloseProps;

        // confirm dialog actions
        const { closeDialog, confirm } = accessConfirmDialog();

        // stop propagation
        event?.stopPropagation();
        event?.preventDefault();

        // compile data
        const dialogProps: IConfirmDialogProps = {
            title: 'Are you sure?',
            content: 'Your selection of category will not be recorded',
            theme: 'warning',
            primaryButtonProps: {
                label: 'CLOSE',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'CANCEL',
                theme: 'primary',
            },
        };

        // logic
        const confirmResult = await confirm(dialogProps);
        closeDialog();
        if (confirmResult && sliderModalState) {
            sliderModalState.selectedCategory.set(null);
            sliderModalState.showModal.set(false);
        }
    };
}
