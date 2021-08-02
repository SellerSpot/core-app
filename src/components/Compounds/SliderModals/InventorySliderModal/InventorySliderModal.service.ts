import { IconifyIcon } from '@iconify/react';
import { ICONS } from '../../../../utilities/utilities';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

type IGetDynamicProps = Pick<IInventorySliderModalProps, 'mode' | 'prefillData'>;

interface IInventorySliderModalDynamicValues {
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IInventorySliderModalForm;
}

export class InventorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): IInventorySliderModalDynamicValues => {
        // props
        const { mode, prefillData } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IInventorySliderModalForm = {
            currentStock: 0,
            markup: 0,
            mrp: 0,
            supplyPrice: 0,
        };

        // initialFormValues
        if (prefillData) {
            initialFormValues = {
                ...prefillData,
            };
        }

        // modalTitle
        if (mode === 'edit') modalTitle = 'Edit product in inventory';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // return
        return {
            initialFormValues,
            modalFooterPrimaryButtonIcon,
            modalFooterPrimaryButtonLabel,
            modalTitle,
        };
    };
}
