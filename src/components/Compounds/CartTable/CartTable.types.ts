import { AnyObject } from 'final-form';

export interface ITaxBracket {
    bracketName: string;
    bracketRate: number;
}

export interface ICartProductsData {
    quantity: number;
    stockUnit: string;
    productName: string;
    unitPrice: number;
    discountPercent: number;
    taxBrackets: ITaxBracket[];
}

export interface ICartFormFormik {
    productName: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
}

export interface ICollapsedContentProps {
    product: ICartProductsData;
    toggleRowExpansion: (rowIndex: number) => void;
    productIndex: number;
}

export interface IFormItemsProps extends ICollapsedContentProps {
    handleSubmit: (
        event?: Partial<
            Pick<React.SyntheticEvent<Element, Event>, 'preventDefault' | 'stopPropagation'>
        >,
    ) => Promise<AnyObject>;
}
