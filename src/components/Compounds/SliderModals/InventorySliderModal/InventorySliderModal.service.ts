import { IconifyIcon } from '@iconify/react';
import { requests } from 'requests/requests';
import { ICONS } from '../../../../utilities/utilities';
import { IOutletData } from '@sellerspot/universal-types';
import {
    IInventorySliderModalForm,
    IInventorySliderModalProps,
} from './InventorySliderModal.types';

type IGetDynamicProps = Pick<IInventorySliderModalProps, 'mode' | 'prefillData'>;

export interface IInventorySliderModalDynamicValues {
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: Partial<IInventorySliderModalForm>;
    allOutlets: IOutletData[];
}

export class InventorySliderModalService {
    static getAllOutlets = async (): Promise<IOutletData[]> => {
        const { data, status } = await requests.catalogue.outletRequest.getAllOutlet();
        if (status) {
            return data;
        }
        return [];
    };

    static getDynamicProps = async (
        props: IGetDynamicProps,
    ): Promise<IInventorySliderModalDynamicValues> => {
        // props
        const { mode } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        const initialFormValues: Partial<IInventorySliderModalForm> = {};

        // initialFormValues
        const allOutlets = await InventorySliderModalService.getAllOutlets();
        allOutlets.map((outlet) => {
            initialFormValues[outlet.id] = {
                mrp: 0,
                sellingPrice: 0,
                stock: 0,
                landingCost: 0,
                markup: 0,
                taxBracket: null,
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
            allOutlets,
        };
    };
}
