import { FormApi } from 'final-form';
import { IOnClickEvents } from '../../../../typings/common.types';
import { IProductSliderModalProps } from '../ProductSliderModal/ProductSliderModal.types';

export interface IInventorySliderModalForm {
    currentStock: number;
    supplyPrice: number;
    markup: number;
    mrp: number;
}

export interface IInventorySliderModalOnSubmit {
    values: IInventorySliderModalForm;
}

export interface IInventorySliderModalOnClose {
    submitting: boolean;
    dirty: boolean;
    source: 'close' | 'back' | 'button' | 'backdrop';
    event: IOnClickEvents['div'] | IOnClickEvents['button'];
}

export type IPrefillData = IInventorySliderModalForm & {
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
