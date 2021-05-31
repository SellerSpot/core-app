import React from 'react';

interface ITableItem {
    name: string;
    description: string;
}

export interface IStandardDataViewTableProps {
    tableItems: ITableItem[];
    isLoading?: boolean;
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
}
