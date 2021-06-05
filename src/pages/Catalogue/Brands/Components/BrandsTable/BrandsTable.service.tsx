// import { ITableCell, ITableRow, Skeleton } from '@sellerspot/universal-components';
// import React from 'react';

// export class StandardDataViewTableService {
//     static tableHeaders: ITableCell[] = [
//         {
//             content: <h5>S.No</h5>,
//             align: 'right',
//             width: '5%',
//             key: 'headerSNo',
//         },
//         {
//             content: <h5>Name</h5>,
//             align: 'left',
//             width: '65%',
//             key: 'headerName',
//         },
//         {
//             content: <h5>Actions</h5>,
//             align: 'right',
//             width: '30%',
//             key: 'headerActions',
//         },
//     ];

//     static getTableSkeletonBody = (containerHeight: number): ITableRow[] => {
//         const heightOfRow = 70;
//         const numberOfSkeletons = Math.round(containerHeight / heightOfRow);
//         return Array(numberOfSkeletons)
//             .fill(0)
//             .map((_, key) => {
//                 return {
//                     key: `${key}`,
//                     cells: [
//                         {
//                             content: <Skeleton height="26px" width="100%" variant="rect" />,
//                             key: `${key}sno`,
//                         },
//                         {
//                             content: <Skeleton height="26px" width="100%" variant="rect" />,
//                             key: `${key}name`,
//                         },
//                         {
//                             content: <Skeleton height="26px" width="100%" variant="rect" />,
//                             key: `${key}actions`,
//                         },
//                     ],
//                 };
//             });
//     };
// }
