import { IconifyIcon } from '@iconify/react';
import { ISelectOption } from '@sellerspot/universal-components';
import { IInventoryData, IOutletData, ITaxBracketData } from '@sellerspot/universal-types';
import { IProductSliderModalProps } from 'components/Compounds/SliderModals/ProductSliderModal/ProductSliderModal.types';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { FormApi } from 'final-form';
import { IOnClickEvents } from '../../../../typings/common.types';

export type IInventorySliderModalFormFields = Pick<
    IInventoryData['outlets'][0],
    'landingCost' | 'markup' | 'sellingPrice' | 'mrp' | 'stock' | 'isActive' | 'isTrack'
> & {
    taxBracket: ISelectOption<ITaxBracketData>;
};

export type IInventorySliderModalForm = {
    [key: string]: Partial<IInventorySliderModalFormFields>;
};

export interface IInventorySliderModalOnSubmit {
    formValues: IInventorySliderModalForm;
    currentProduct: IInventoryData;
    mode: IInventorySliderModalState['mode'];
}

export interface IInventorySliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

type IPrefillData = {
    product: IInventoryData;
};

export interface IInventorySliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<
        FormApi<IInventorySliderModalForm, Partial<IInventorySliderModalForm>>
    >;
    prefillData: IPrefillData;
    onSubmit: (props: IInventorySliderModalOnSubmit) => Promise<void>;
    onClose: (props: IInventorySliderModalOnClose) => void;
}

export interface ISearchInventorySelectMeta {
    type: 'inventoryProduct' | 'catalogueProduct';
}

export interface IInventorySliderModalDynamicValues {
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
}
export interface IInventorySliderModalState {
    searchOption: ISelectOption;
    mode: 'edit' | 'create';
    dynamicValues: IInventorySliderModalDynamicValues;
    outletsToShow: IOutletData[];
    currentInventoryProduct: IInventoryData;
    /**
     * Used to record the current focused outlet (where required)
     * For example to know which field to change after tax creation
     */
    focussedOutletId: string;
}

export interface IInventorySubSliderHandlers {
    /**
     * When a new catalogue product is created from the search field
     */
    onCreateProduct: (value: string) => void;
    /**
     * When a catalogue product is added to the inventory
     */
    onAddProductToInventory: (options: ISelectOption<ISearchInventorySelectMeta>) => void;
    /**
     * When an already existing inventory product is selected
     */
    onSelectInventoryProduct: (options: ISelectOption<ISearchInventorySelectMeta>) => void;
    /**
     * When a user wants to create a new Tax Bracket from the outlets cards
     */
    onCreateTaxBracket: (outletId: string, value: string) => void;
    /**
     * When a user wants to create a new Tax Group from the outlets cards
     */
    onCreateTaxGroup: (outletId: string, value: string) => void;
}

export interface IInventorySliderModalSubSliderModalState {
    productSliderModal: Pick<IProductSliderModalProps, 'showModal' | 'prefillData' | 'mode'>;
    taxBracketSliderModal: Pick<ITaxBracketSliderModalProps, 'showModal' | 'prefillData' | 'mode'>;
    taxGroupSliderModal: Pick<ITaxGroupSliderModalProps, 'showModal' | 'prefillData' | 'mode'>;
}
