import { IconifyIcon } from '@iconify/react';
import { IOutletData, ITaxBracketData } from '@sellerspot/universal-types';
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
    outletsToShow: IOutletData[];
}

export class InventorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): IInventorySliderModalDynamicValues => {
        // props
        const { mode, allOutlets, prefillData } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT TO INVENTORY';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        const initialFormValues: Partial<IInventorySliderModalForm> = {};
        let outletsToShow: IInventorySliderModalDynamicValues['outletsToShow'] = allOutlets;

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
            outletsToShow = [];
            const outlets = Object.keys(prefillData['prefillData']);
            outlets.map((outletId) => {
                initialFormValues[outletId] = {
                    landingCost: prefillData['prefillData'][outletId].landingCost,
                    markup: prefillData['prefillData'][outletId].markup,
                    mrp: prefillData['prefillData'][outletId].mrp,
                    sellingPrice: prefillData['prefillData'][outletId].sellingPrice,
                    stock: prefillData['prefillData'][outletId].stock,
                    taxSetting: {
                        label: (prefillData['prefillData'][outletId].taxBracket as ITaxBracketData)
                            .name,
                        value: (prefillData['prefillData'][outletId].taxBracket as ITaxBracketData)
                            .id,
                    },
                };
                outletsToShow.push(prefillData['prefillData'][outletId].outlet as IOutletData);
            });
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
            outletsToShow,
        };
    };
}
