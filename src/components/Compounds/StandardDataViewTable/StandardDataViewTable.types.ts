import React from 'react';

interface ITableItem {
    name: string;
    description: string;
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IStandardDataViewTableProps {
    tableItems: ITableItem[];
    isLoading?: boolean;
}
