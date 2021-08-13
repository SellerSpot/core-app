import { State } from '@hookstate/core';
import { ICartDetails } from '@sellerspot/universal-types';

export interface ICartTableProps {
    cartData: State<ICartDetails[]>;
    searchFieldFocusTriggerer: () => void;
}

// interface for the props passed to Collapsed Content in Cart Table
export interface ICartTableFormValues {
    productName: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
}
export interface ICartTableCollapsedProps {
    product: State<ICartDetails>;
    toggleRowExpansion: (productIndex: number) => void;
    productIndex: number;
}

// interface for the props passed to Cart Table Collapsed Form
export interface ICartTableCollapsedFormProps {
    product: State<ICartDetails>;
    formValues: ICartTableFormValues;
    handleSubmit: () => void;
    handleCancel: () => void;
}
