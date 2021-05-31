import { IGetAllBrandsResponse } from '@sellerspot/universal-types';
import React from 'react';

export interface IBrandsTableProps {
    tableItems: IGetAllBrandsResponse['data'];
    isLoading?: boolean;
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
}
