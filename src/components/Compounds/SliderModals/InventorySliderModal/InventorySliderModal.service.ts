import { IconifyIcon } from '@iconify/react';
import { ICONS } from '../../../../utilities/utilities';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

type IGetDynamicProps = Pick<IInventorySliderModalProps, 'mode' | 'prefillData' | 'allOutlets'>;

export interface IInventorySliderModalDynamicValues {
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: Partial<IInventorySliderModalForm>;
}

export class InventorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): IInventorySliderModalDynamicValues => {
        // props
        const { mode, allOutlets } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        const initialFormValues: Partial<IInventorySliderModalForm> = {};

        // initialFormValues
        allOutlets.map((outlet) => {
            initialFormValues[outlet.id] = {
                mrp: 0,
                sellingPrice: 0,
                stock: 0,
                landingCost: 0,
                markup: 0,
                taxSetting: null,
            };
        });

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
