// import { InputField, ITableProps, Table } from '@sellerspot/universal-components';
// import { debounce } from 'lodash';
// import React, { ReactElement, useEffect } from 'react';
// import create from 'zustand';
// import styles from './OutletsTable.module.scss';
// import { IOutletsTableProps, TUseOutletTableState } from './OutletsTable.types';
// export { IOutletsTableProps } from './OutletsTable.types';

// const useOutletTableState = create<TUseOutletTableState>((set, get) => ({
//     data: [],
//     setData: (data) => {
//         set({ data });
//     },
// }));

// const headers: ITableProps['headers'] = [
//     {
//         content: 'Outlet',
//         width: '15%',
//     },
//     {
//         content: 'Current Stock',
//         width: '20%',
//     },
//     {
//         content: 'Supply Price',
//         width: '20%',
//     },
//     {
//         content: 'Markup',
//         width: '20%',
//     },
//     {
//         content: 'Retail Price',
//         width: '20%',
//     },
// ];

// const CurrentStockField = (props: { outletIndex: number }) => {
//     const { outletIndex } = props;
//     const { data, setData } = useOutletTableState();
//     const handleOnBlur = debounce(
//         (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//             const value = event.target.value;
//             data[outletIndex].currentStock = +value;
//             setData(data);
//         },
//         1000,
//     );
//     return (
//         <InputField
//             key={outletIndex}
//             size="small"
//             minNumericValue={0}
//             fullWidth
//             direction="rtl"
//             suffix={<h6></h6>}
//             type="number"
//             onBlur={handleOnBlur}
//             disableHelperTextPlaceholderPadding
//             theme="primary"
//         />
//     );
// };

// const getTableBody = (props: { data: IOutletsTableProps['data'] }): ITableProps['body'] => {
//     const { data } = props;
//     return data.map((outlet, outletIndex) => {
//         return {
//             cells: [
//                 {
//                     width: '15%',
//                     content: <h6>Outlet</h6>,
//                 },
//                 {
//                     width: '20%',
//                     content: <CurrentStockField outletIndex={outletIndex} />,
//                 },
//                 {
//                     width: '20%',
//                     content: (
//                         <InputField
//                             key={outletIndex}
//                             size="small"
//                             minNumericValue={0}
//                             fullWidth
//                             type="number"
//                             disableHelperTextPlaceholderPadding
//                             theme="primary"
//                             prefix={<h6>₹</h6>}
//                         />
//                     ),
//                 },
//                 {
//                     width: '20%',
//                     content: (
//                         <InputField
//                             key={outletIndex}
//                             size="small"
//                             fullWidth
//                             minNumericValue={0}
//                             maxNumericValue={100}
//                             type="number"
//                             disableHelperTextPlaceholderPadding
//                             theme="primary"
//                             suffix={<h6>%</h6>}
//                         />
//                     ),
//                 },
//                 {
//                     width: '20%',
//                     content: (
//                         <InputField
//                             key={outletIndex}
//                             size="small"
//                             fullWidth
//                             minNumericValue={0}
//                             type="number"
//                             disableHelperTextPlaceholderPadding
//                             theme="primary"
//                             prefix={<h6>₹</h6>}
//                         />
//                     ),
//                 },
//             ],
//         };
//     });
// };

// export const OutletsTable = (props: IOutletsTableProps): ReactElement => {
//     const { data } = props;
//     const { setData } = useOutletTableState();
//     // setting data into the store
//     useEffect(() => {
//         setData(data);
//     }, [data]);

//     const tableBody: ITableProps['body'] = ({}) => {
//         return getTableBody({ data });
//     };
//     return <Table size="small" headers={headers} body={tableBody} />;
// };
