export interface ICheckoutSaleSummaryViewProps {
    subTotal: number;
    totalTaxes: number;
    totalDiscount: number;
    grandTotal: number;
    completeSaleCallback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
