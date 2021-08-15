import { FormApi } from 'final-form';
import { IOnClickEvents } from '../../../../typings/common.types';
import { IInventoryData, IOutletData, ITaxSettingData } from '@sellerspot/universal-types';
import { IProductSliderModalProps } from '../ProductSliderModal/ProductSliderModal.types';
import { ISelectOption } from '@sellerspot/universal-components';
import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';

export type IInventorySliderModalFormFields = Pick<
    IInventoryData['configurations'][0],
    'landingCost' | 'markup' | 'sellingPrice' | 'mrp' | 'stock'
> & {
    taxSetting: ISelectOption<ITaxSettingData>;
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
    prefillData: IInventoryData['configurations'];
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
