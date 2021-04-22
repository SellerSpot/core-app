// import { ITableCell, Table } from '@sellerspot/universal-components';
// import React, { ReactElement } from 'react';
// import { IStandardDataViewTableProps } from './StandardDataViewTable.types';
// export { IStandardDataViewTableProps } from './StandardDataViewTable.types';

// // assembles headers for the table
// const tableHeaders: ITableCell[] = [
//     {
//         content: 'Name',
//         align: 'left',
//         width: '40%',
//     },
//     {
//         content: 'Description',
//         align: 'left',
//         width: '40%',
//     },
//     {
//         content: 'No.of Products',
//         align: 'right',
//         width: '10%',
//     },
//     {
//         content: '',
//         align: 'left',
//         width: '10%',
//     },
// ];

// // assembles the body content for the table
// const TableBody = (props: { tableData: IStandardDataViewTableProps['tableData'] }) => {
//     const { tableData } = props;
//     return tableData.map((tableRow) => {
//         return;
//     });
// };

// export const StandardDataViewTable = (props: IStandardDataViewTableProps): ReactElement => {
//     const { tableData } = props;
//     return <Table headers={tableHeaders} body={<TableBody tableData={tableData} />} />;
// };
