import {
    Table,
    ITableCell,
    ITableProps,
    ITableRow,
    ToolTip,
    InputField,
    Button,
} from '@sellerspot/universal-components';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, modifyCartProductName } from 'store/models/cart';
import { ICartProductsData, TCartTableLocalStore } from './CartTable.types';
import styles from './CartTable.module.scss';
import create from 'zustand';
import { CartTableService } from './CartTable.service';
import { numberFormatINRCurrency } from 'utilities/general';
import { computeDiscountUsingPercentage } from 'utilities/businessLogic';

// const Row = (row: ICartProductsData, index: number): ReactElement => {
//     const [openProductDetail, setOpenProductDetail] = useState(false);
//     const [openTaxDetail, setOpenTaxDetail] = useState(false);
//     const [rowObjectCopy, setRowObjectCopy] = useState<ICartProductsData>(null);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         console.log('Row copy created');

//         setRowObjectCopy(row);
//     }, []);

//     return (
//         <>
//             <TableRow
//                 className={classes.root}
//                 key={index + 'row'}
//                 onClick={() => {
//                     setOpenProductDetail(!openProductDetail);
//                 }}
//             >
//                 <TableCell>
//                     <div
//                         className={cn(styles.expandRowIcon, {
//                             [styles.rotatedExpandRowIcon]: openProductDetail,
//                         })}
//                     >
//                         <IconButton
//                             icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
//                             size={'small'}
//                             theme={'grey'}
//                             onClick={() => setOpenProductDetail(!openProductDetail)}
//                         />
//                     </div>
//                 </TableCell>
//                 <TableCell padding={'none'} align="left">
//                     {index + 1}
//                 </TableCell>
// <ToolTip content={row.productName.length > 30 ? row.productName : ''}>
//     <TableCell align="left">
//         {<h6 className={styles.productNameText}>{`${row.productName}`}</h6>}
//     </TableCell>
// </ToolTip>
//                 <TableCell align="right">{`${row.quantity} ${row.stockUnit}`}</TableCell>
//                 <TableCell align="right">
//                     {numberFormatINRCurrency(
//                         computeProductSubTotal({
//                             discountPercent: row.discountPercent,
//                             quantity: row.quantity,
//                             taxBrackets: row.taxBrackets,
//                             unitPrice: row.unitPrice,
//                         }),
//                     )}
//                 </TableCell>
//             </TableRow>
//             <TableRow key={index + 'collapsed'}>
//                 <TableCell style={{ paddingBottom: '2px', paddingTop: 0 }} colSpan={5}>
//                     <Collapse in={openProductDetail}>
//                         <div className={styles.collapsedDiv}>
//                             <div className={styles.productName}>
//                                 <InputField
//                                     label={'Product Name'}
//                                     fullWidth={true}
//                                     theme={'primary'}
//                                     value={row.productName}
//                                     selectTextOnClick={true}
//                                     onChange={(event) => {
//                                         dispatch(
//                                             modifyCartProductName({
//                                                 productIndex: index,
//                                                 productName: event.target.value,
//                                             }),
//                                         );
//                                     }}
//                                     onBlur={(event) => {
//                                         if (event.target.value.length === 0) {
//                                             dispatch(
//                                                 modifyCartProductName({
//                                                     productIndex: index,
//                                                     productName: rowObjectCopy.productName,
//                                                 }),
//                                             );
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className={styles.propertyRow}>
//                                 <InputField
//                                     label={'Quantity'}
//                                     type={'number'}
//                                     selectTextOnClick={true}
//                                     suffix={<h6>{row.stockUnit}</h6>}
//                                     value={row.quantity.toString()}
//                                     onChange={(event) =>
//                                         dispatch(
//                                             modifyCartProductQuantity({
//                                                 productIndex: index,
//                                                 quantity: +event.target.value,
//                                             }),
//                                         )
//                                     }
//                                 />
//                                 <InputField
//                                     type={'number'}
//                                     prefix={<h6>₹</h6>}
//                                     value={row.unitPrice + ''}
//                                     selectTextOnClick={true}
//                                     label={`Unit Price (per ${row.stockUnit})`}
//                                     helperMessage={{
//                                         enabled: rowObjectCopy?.unitPrice !== row.unitPrice,
//                                         content: `Original: ${numberFormatINRCurrency(
//                                             rowObjectCopy?.unitPrice,
//                                         )}`,
//                                         type: 'success',
//                                     }}
//                                     onChange={(event) =>
//                                         dispatch(
//                                             modifyCartProductUnitPrice({
//                                                 productIndex: index,
//                                                 unitPrice: +event.target.value,
//                                             }),
//                                         )
//                                     }
//                                 />
//                                 <InputField
//                                     label={'Discount (%)'}
//                                     suffix={<h6>%</h6>}
//                                     type={'number'}
//                                     selectTextOnClick={true}
//                                     // maxNumericValue={100}
//                                     // minNumericValue={0}
//                                     value={row.discountPercent + ''}
//                                     onChange={(event) => {
//                                         let valueToDispatch = +event.target.value;
//                                         if (valueToDispatch > 100) {
//                                             valueToDispatch = 100;
//                                         } else if (valueToDispatch < 0) {
//                                             valueToDispatch = 0;
//                                         }
//                                         dispatch(
//                                             modifyCartProductDiscountPercent({
//                                                 productIndex: index,
//                                                 discountPercent: valueToDispatch,
//                                             }),
//                                         );
//                                     }}
//                                     helperMessage={{
//                                         enabled: row.discountPercent > 0,
//                                         content: `- ${numberFormatINRCurrency(
//                                             computeDiscountUsingPercentage({
//                                                 unitPrice: row.unitPrice,
//                                                 discountPercent: row.discountPercent,
//                                             }),
//                                         )}`,
//                                         type: 'success',
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </>
//     );
// };

// local store to handle data input into fields

const CollapsedContent = (props: { product: ICartProductsData; productIndex: number }) => {
    const { product, productIndex } = props;
    const { productName, quantity, discountPercent, unitPrice, stockUnit } = product;
    const [productNameLocal, setProductNameLocal] = useState(productName);
    const [productQuantityLocal, setQuantityLocal] = useState(quantity);
    const [productDiscountPercentLocal, setDiscountPercentLocal] = useState(discountPercent);
    const [productUnitPriceLocal, setUnitPriceLocal] = useState(unitPrice);
    const dispatch = useDispatch();

    // used to detect if the table values have been changed
    const haveValuesBeenChanged = () => {
        if (
            productNameLocal !== productNameLocal ||
            quantity !== productQuantityLocal ||
            discountPercent !== productDiscountPercentLocal ||
            unitPrice !== productUnitPriceLocal
        ) {
            return false;
        }
        return true;
    };

    return (
        <div key={'collapsedContent' + productIndex} className={styles.collapsedDiv}>
            <div className={styles.productName}>
                <InputField
                    label={'Product Name'}
                    fullWidth={true}
                    theme={'primary'}
                    value={productNameLocal + ''}
                    selectTextOnClick={true}
                    onChange={(event) => {
                        CartTableService.handleProductNameChange(
                            event.target.value,
                            setProductNameLocal,
                        );
                    }}
                />
            </div>
            <div className={styles.propertyRow}>
                <InputField
                    label={'Quantity'}
                    type={'number'}
                    selectTextOnClick={true}
                    theme={'primary'}
                    suffix={<h6>{stockUnit}</h6>}
                    value={productQuantityLocal + ''}
                    onChange={(event) =>
                        CartTableService.handleProductQuantityChange(
                            event.target.value,
                            setQuantityLocal,
                        )
                    }
                />
                <InputField
                    type={'number'}
                    prefix={<h6>₹</h6>}
                    value={productUnitPriceLocal + ''}
                    theme={'primary'}
                    selectTextOnClick={true}
                    label={`Unit Price (per ${stockUnit})`}
                    helperMessage={{
                        enabled: unitPrice !== productUnitPriceLocal,
                        content: `Original: ${numberFormatINRCurrency(unitPrice)}`,
                        type: 'success',
                    }}
                    onChange={(event) => {
                        CartTableService.handleProductUnitPriceChange(
                            event.target.value,
                            setUnitPriceLocal,
                        );
                    }}
                />
                <InputField
                    label={'Discount (%)'}
                    suffix={<h6>%</h6>}
                    type={'number'}
                    selectTextOnClick={true}
                    theme={'primary'}
                    value={productDiscountPercentLocal + ''}
                    onChange={(event) => {
                        let valueToDispatch = +event.target.value;
                        if (valueToDispatch > 100) {
                            valueToDispatch = 100;
                        } else if (valueToDispatch < 0) {
                            valueToDispatch = 0;
                        }
                        CartTableService.handleProductDiscountPercentChange(
                            valueToDispatch,
                            setDiscountPercentLocal,
                        );
                    }}
                    helperMessage={{
                        enabled: productDiscountPercentLocal > 0,
                        content: `- ${numberFormatINRCurrency(
                            computeDiscountUsingPercentage({
                                unitPrice: productUnitPriceLocal,
                                discountPercent: productDiscountPercentLocal,
                            }),
                        )}`,
                        type: 'success',
                    }}
                />
            </div>
            <div className={styles.collapsedDivActions}>
                <Button size={'small'} theme={'danger'} variant={'outlined'} label={'Cancel'} />
                <Button
                    size={'small'}
                    theme={'primary'}
                    disabled={haveValuesBeenChanged()}
                    variant={'contained'}
                    label={'Update'}
                />
            </div>
        </div>
    );
};

const getTableCells = (product: ICartProductsData, productIndex: number): ITableCell[] => {
    const { productName, quantity, subTotal } = product;
    return [
        {
            content: productIndex + 1,
            align: 'right',
        },
        {
            content: (
                <ToolTip content={productName.length > 30 ? productName : ''}>
                    {<h6 className={styles.productNameText}>{productName}</h6>}
                </ToolTip>
            ),
        },
        {
            content: quantity,
            align: 'right',
        },
        {
            content: subTotal,
            align: 'right',
        },
    ];
};

const tableHeaders: ITableCell[] = [
    {
        content: 'S.No',
        width: '5%',
        align: 'left',
    },
    {
        content: 'Product',
        width: '55%',
        align: 'left',
    },
    {
        content: 'Qty',
        width: '5%',
        align: 'right',
    },
    {
        content: 'Sub-Total',
        width: '25%',
        align: 'right',
    },
];

const getTableBody = (products: ICartProductsData[]): ITableRow[] => {
    return products.map((product, productIndex) => {
        return {
            cells: getTableCells(product, productIndex),
            collapsedContent: <CollapsedContent product={product} productIndex={productIndex} />,
        };
    });
};

export default function CartTable(): ReactElement {
    const { productsData } = useSelector(cartSelector);
    return (
        <Table
            hasExpandableRows={true}
            headers={tableHeaders}
            stickyHeader={true}
            body={getTableBody(productsData)}
        />
    );
}
