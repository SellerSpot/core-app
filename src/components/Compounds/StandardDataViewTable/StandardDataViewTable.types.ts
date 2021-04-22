import React from 'react';

interface ITableItem {
    name: string;
    description: string;
    noOfProducts: number;
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IStandardDataViewTableProps {
    tableItems: ITableItem[];
}
