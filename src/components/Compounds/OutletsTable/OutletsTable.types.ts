interface IOutlet {
    outletName: string;
    currentStock: number;
    stockUnit: string;
    supplyPrice: number;
    markupPercentage: number;
    retailPrice: number;
}

export interface IOutletsTableProps {
    data: IOutlet[];
}

export type TUseOutletTableState = {
    data: IOutlet[];
    setData: (data: IOutlet[]) => void;
};
