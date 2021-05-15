import { CSSProperties } from '@material-ui/styles';

interface IBill90MMProducts {
    name: string;
    subTotal: string;
    unitPrice: string;
    quantity: number;
    stockUnit: string;
    discount?: string;
}

interface IBill90MMData {
    storeName: string;
    saleTotal: string;
    saleDiscount: string;
    saleSubTotal: string;
    saleTotalTax: string;
    saleTotalTaxPercentage: number;
    headerMessage?: string;
    footerMessage?: string;
    products: IBill90MMProducts[];
}

export interface IBill90MMProps {
    billReference: React.RefObject<HTMLDivElement>;
    billData: IBill90MMData;
    style?: CSSProperties;
}
