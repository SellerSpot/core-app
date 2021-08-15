export interface ICheckoutSaleSummaryViewProps {
    viewMode: 'cart' | 'checkout' | 'park' | 'quote' | 'print';
    proceedCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
