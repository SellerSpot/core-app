import { IconifyIcon } from '@iconify/react';
import { ISelectOption } from '@sellerspot/universal-components';
import { ISearchInventorySelectMeta } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
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
    searchField: {
        disabled: boolean;
        selectedProduct: ISelectOption<ISearchInventorySelectMeta>;
    };
}

export class InventorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): IInventorySliderModalDynamicValues => {
        // props
        const { mode, allOutlets, prefillData } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        const initialFormValues: Partial<IInventorySliderModalForm> = {};
        let searchFieldProps: IInventorySliderModalDynamicValues['searchField'] = {
            disabled: false,
            selectedProduct: null,
        };

        // initialFormValues
        if (!prefillData) {
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
        } else {
            const outlets = Object.keys(prefillData);
            outlets.map((outletId) => {
                initialFormValues[outletId] = {
                    ...prefillData['prefillData'][outletId],
                };
            });
            searchFieldProps = {
                disabled: true,
                selectedProduct: prefillData.product,
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
            searchField: searchFieldProps,
        };
    };
}
