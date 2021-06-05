export interface ITaxBracket {
    bracketName: string;
    rate: string;
}

export interface ITaxGroup {
    name: string;
    noOfTaxes: number;
    taxGroupRate: string;
    noOfProducts: number;
    brackets: ITaxBracket[];
}

export interface ITaxGroupsTableProps {
    taxGroups: ITaxGroup[];
}
