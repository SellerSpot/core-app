export interface ICheckoutSaleSummaryViewProps {
    viewMode: 'cart' | 'checkout';
    subTotal: number;
    totalTaxes: number;
    totalDiscount: number;
    grandTotal: number;
    proceedCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
