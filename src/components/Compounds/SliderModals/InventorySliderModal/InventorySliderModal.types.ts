import { FormApi } from 'final-form';
import { IOnClickEvents } from '../../../../typings/common.types';
import { IInventoryData } from '@sellerspot/universal-types';
import { IProductSliderModalProps } from '../ProductSliderModal/ProductSliderModal.types';

export type IInventorySliderModalForm = {
    [key: string]: Pick<
        IInventoryData['outlets'][0],
        'landingCost' | 'markup' | 'sellingPrice' | 'mrp' | 'stock' | 'taxBracket'
    >;
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

type IPrefillData = IInventorySliderModalForm & {
    id: string;
};

export interface IInventorySliderModalProps {
    showModal: boolean;
    formRef: React.MutableRefObject<
        FormApi<IInventorySliderModalForm, Partial<IInventorySliderModalForm>>
    >;
    mode: 'edit' | 'create';
    prefillData: IPrefillData;
    onSubmit: (props: IInventorySliderModalOnSubmit) => Promise<void>;
    onClose: (props: IInventorySliderModalOnClose) => void;
    onCreateProduct: (name: string) => void;
    productSliderModalProps: IProductSliderModalProps;
}
