import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
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
    product: IInventorySliderModalDynamicValues['searchField']['selectedProduct'];
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
    onSubmit: (props: IInventorySliderModalOnSubmit) => Promise<void>;
    onClose: (props: IInventorySliderModalOnClose) => void;
    onCreateProduct: (name: string) => void;
    productSliderModalProps: IProductSliderModalProps;
}
