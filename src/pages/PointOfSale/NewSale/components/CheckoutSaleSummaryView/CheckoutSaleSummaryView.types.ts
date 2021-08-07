export interface ICheckoutSaleSummaryViewProps {
    viewMode: 'cart' | 'checkout';
    subTotal: number;
    totalTaxes: number;
    totalDiscount: number;
    grandTotal: number;
    completeSaleCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
