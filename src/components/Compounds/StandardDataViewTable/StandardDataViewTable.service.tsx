import { ITableCell, ITableRow, Skeleton } from '@sellerspot/universal-components';
import React from 'react';

export class StandardDataViewTableService {
    static tableHeaders: ITableCell[] = [
        {
            content: <h5>S.No</h5>,
            align: 'right',
            width: '5%',
        },
        {
            content: <h5>Name</h5>,
            align: 'left',
            width: '25%',
        },
        {
            content: <h5>Description</h5>,
            align: 'left',
            width: '45%',
        },
        {
            content: <h5>Actions</h5>,
            align: 'right',
            width: '25%',
        },
    ];

    static getTableSkeletonBody = (containerHeight: number): ITableRow[] => {
        const heightOfRow = 70;
        const numberOfSkeletons = Math.round(containerHeight / heightOfRow);
        return Array(numberOfSkeletons)
            .fill(0)
            .map(() => {
                return {
                    cells: [
                        {
                            content: <Skeleton height="26px" width="100%" variant="rect" />,
                        },
                        {
                            content: <Skeleton height="26px" width="100%" variant="rect" />,
                        },
                        {
                            content: <Skeleton height="26px" width="100%" variant="rect" />,
                        },
                        {
                            content: <Skeleton height="26px" width="100%" variant="rect" />,
                        },
                    ],
                };
            });
    };
}
