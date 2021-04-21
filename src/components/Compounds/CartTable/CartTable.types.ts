import { AnyObject } from 'final-form';

// interface for tax bracket structure in products
interface ITaxBracket {
    bracketName: string;
    bracketRate: number;
}

// interface for the products in the Cart Table
export interface ICartTableProduct {
    quantity: number;
    stockUnit: string;
    productName: string;
    unitPrice: number;
    discountPercent: number;
    taxBrackets: ITaxBracket[];
}

// interface for the different fields in the Cart Table forms
export interface ICartTableForm {
    productName: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
}

// interface for the props passed to Collapsed Content in Cart Table
export interface ICartTableCollapsedProps {
    product: ICartTableProduct;
    toggleRowExpansion: (rowIndex: number) => void;
    productIndex: number;
}

// interface for the props passed to Cart Table Collapsed Form
export interface ICartTableCollapsedFormProps extends ICartTableCollapsedProps {
    handleSubmit: (
        event?: Partial<
            Pick<React.SyntheticEvent<Element, Event>, 'preventDefault' | 'stopPropagation'>
        >,
    ) => Promise<AnyObject>;
}
