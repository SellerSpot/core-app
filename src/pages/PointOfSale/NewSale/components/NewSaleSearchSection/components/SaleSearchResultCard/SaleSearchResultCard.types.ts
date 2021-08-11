export interface ISaleSearchResultCard {
    productImage: string;
    productName: string;
    unitPrice: number;
    stockUnit: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
