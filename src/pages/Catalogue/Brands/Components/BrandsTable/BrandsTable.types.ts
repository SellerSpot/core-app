import { IGetAllBrandResponse } from '@sellerspot/universal-types';
import React from 'react';

export interface IBrandsTableProps {
    tableItems: IGetAllBrandResponse['data'];
    isLoading?: boolean;
    editItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
    deleteItemCallback: (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number) => void;
}
