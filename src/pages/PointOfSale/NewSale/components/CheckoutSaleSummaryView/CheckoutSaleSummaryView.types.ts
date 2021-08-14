export interface ICheckoutSaleSummaryViewProps {
    viewMode: 'cart' | 'checkout' | 'park' | 'quote';
    proceedCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
