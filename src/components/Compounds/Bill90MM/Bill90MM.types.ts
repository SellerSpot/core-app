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
    storeAddress: string;
    saleTotal: string;
    saleDiscount: string;
    saleSubTotal: string;
    saleTotalTax: string;
    saleTotalTaxPercentage: number;
    footerMessage?: string;
    products: IBill90MMProducts[];
}

export interface IBill90MMProps {
    billData: IBill90MMData;
    billReference?: React.RefObject<HTMLDivElement>;
    style?: CSSProperties;
}
