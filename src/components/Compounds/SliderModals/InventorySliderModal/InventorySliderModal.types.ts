import { ISearchInventorySelectMeta } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import { ITaxBracketSliderModalProps } from 'components/Compounds/SliderModals/TaxBracketSliderModal/TaxBracketSliderModal.types';
import { ITaxGroupSliderModalProps } from 'components/Compounds/SliderModals/TaxGroupSliderModal/TaxGroupSliderModal.types';
import { FormApi } from 'final-form';
import { ISelectOption } from '@sellerspot/universal-components';
import { IInventoryData, IOutletData, ITaxBracketData } from '@sellerspot/universal-types';
import { IOnClickEvents } from '../../../../typings/common.types';
import { IProductSliderModalProps } from '../ProductSliderModal/ProductSliderModal.types';

export type IInventorySliderModalFormFields = Pick<
    IInventoryData['outlets'][0],
    'landingCost' | 'markup' | 'sellingPrice' | 'mrp' | 'stock'
> & {
    taxSetting: ISelectOption<ITaxBracketData>;
};

export type IInventorySliderModalForm = {
    [key: string]: IInventorySliderModalFormFields;
};

export interface IInventorySliderModalOnSubmit {
    values: IInventorySliderModalForm;
}

export interface IInventorySliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

type IPrefillData = {
    product: IInventoryData;
    prefillData: IInventoryData['outlets'];
};

export interface IInventorySliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<
        FormApi<IInventorySliderModalForm, Partial<IInventorySliderModalForm>>
    >;
    allOutlets: IOutletData[];
    mode: 'edit' | 'create';
    prefillData: IPrefillData;
    isLoadingBody: boolean;
    searchValue: ISelectOption<ISearchInventorySelectMeta>;
    onSubmit: (props: IInventorySliderModalOnSubmit) => Promise<void>;
    onClose: (props: IInventorySliderModalOnClose) => void;
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
    productSliderModalProps: IProductSliderModalProps;
    taxBracketSliderModalProps: ITaxBracketSliderModalProps;
    taxGroupSliderModalProps: ITaxGroupSliderModalProps;
}
