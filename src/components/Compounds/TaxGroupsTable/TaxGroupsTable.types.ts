import React from 'react';

interface ITaxBracket {
    bracketName: string;
    rate: string;
}

interface ITableItem {
    name: string;
    noOfTaxes: number;
    taxGroupRate: string;
    noOfProducts: number;
    brackets: ITaxBracket[];
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ITaxGroupsTableProps {
    tableItems: ITableItem[];
}
