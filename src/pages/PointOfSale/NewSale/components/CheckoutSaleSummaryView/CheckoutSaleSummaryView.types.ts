export interface ICheckoutSaleSummaryViewProps {
    viewMode: 'cart' | 'checkout';
    proceedCallback?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
