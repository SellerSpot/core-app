import {
    Collapse,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import cn from 'classnames';
import { IconButton } from '@sellerspot/universal-components';
import InputField from 'components/Atoms/InputField/InputField';
import ToolTip from 'components/Atoms/ToolTip/ToolTip';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartSelector,
    modifyCartProductDiscountPercent,
    modifyCartProductName,
    modifyCartProductQuantity,
    modifyCartProductUnitPrice,
} from 'store/models/cart';
import { computeDiscountUsingPercentage, computeProductSubTotal } from 'utilities/businessLogic';
import { numberFormatINRCurrency } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import styles from './CartTable.module.scss';
import { ICartProductsData } from './CartTable.types';

const Row = (row: ICartProductsData, index: number): ReactElement => {
    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [openTaxDetail, setOpenTaxDetail] = useState(false);
    const [rowObjectCopy, setRowObjectCopy] = useState<ICartProductsData>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Row copy created');

        setRowObjectCopy(row);
    }, []);

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
            cursor: 'pointer',
        },
    });
    const classes = useRowStyles();
    return (
        <>
            <TableRow
                className={classes.root}
                key={index + 'row'}
                onClick={() => {
                    setOpenProductDetail(!openProductDetail);
                }}
            >
                <TableCell>
                    <div
                        className={cn(styles.expandRowIcon, {
                            [styles.rotatedExpandRowIcon]: openProductDetail,
                        })}
                    >
                        <IconButton
                            icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
                            size={'small'}
                            theme={'grey'}
                            onClick={() => setOpenProductDetail(!openProductDetail)}
                        />
                    </div>
                </TableCell>
                <TableCell padding={'none'} align="left">
                    {index + 1}
                </TableCell>
                <ToolTip title={row.productName.length > 30 ? row.productName : ''}>
                    <TableCell align="left">
                        {<h6 className={styles.productNameText}>{`${row.productName}`}</h6>}
                    </TableCell>
                </ToolTip>
                <TableCell align="right">{`${row.quantity} ${row.stockUnit}`}</TableCell>
                <TableCell align="right">
                    {numberFormatINRCurrency(
                        computeProductSubTotal({
                            discountPercent: row.discountPercent,
                            quantity: row.quantity,
                            taxBrackets: row.taxBrackets,
                            unitPrice: row.unitPrice,
                        }),
                    )}
                </TableCell>
            </TableRow>
            <TableRow key={index + 'collapsed'}>
                <TableCell style={{ paddingBottom: '2px', paddingTop: 0 }} colSpan={5}>
                    <Collapse in={openProductDetail}>
                        <div className={styles.collapsedDiv}>
                            <div className={styles.productName}>
                                <InputField
                                    label={'Product Name'}
                                    fullWidth={true}
                                    state={'primary'}
                                    value={row.productName}
                                    selectTextOnClick={true}
                                    onChange={(event) => {
                                        dispatch(
                                            modifyCartProductName({
                                                productIndex: index,
                                                productName: event.target.value,
                                            }),
                                        );
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value.length === 0) {
                                            dispatch(
                                                modifyCartProductName({
                                                    productIndex: index,
                                                    productName: rowObjectCopy.productName,
                                                }),
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.propertyRow}>
                                <InputField
                                    label={'Quantity'}
                                    type={'number'}
                                    selectTextOnClick={true}
                                    suffix={<h6>{row.stockUnit}</h6>}
                                    value={row.quantity.toString()}
                                    onChange={(event) =>
                                        dispatch(
                                            modifyCartProductQuantity({
                                                productIndex: index,
                                                quantity: +event.target.value,
                                            }),
                                        )
                                    }
                                />
                                <InputField
                                    type={'number'}
                                    prefix={<h6>₹</h6>}
                                    value={row.unitPrice + ''}
                                    selectTextOnClick={true}
                                    label={`Unit Price (per ${row.stockUnit})`}
                                    helperMessage={{
                                        enabled: rowObjectCopy?.unitPrice !== row.unitPrice,
                                        content: `Original: ${numberFormatINRCurrency(
                                            rowObjectCopy?.unitPrice,
                                        )}`,
                                        type: 'success',
                                    }}
                                    onChange={(event) =>
                                        dispatch(
                                            modifyCartProductUnitPrice({
                                                productIndex: index,
                                                unitPrice: +event.target.value,
                                            }),
                                        )
                                    }
                                />
                                <InputField
                                    label={'Discount (%)'}
                                    suffix={<h6>%</h6>}
                                    type={'number'}
                                    selectTextOnClick={true}
                                    // maxNumericValue={100}
                                    // minNumericValue={0}
                                    value={row.discountPercent + ''}
                                    onChange={(event) => {
                                        let valueToDispatch = +event.target.value;
                                        if (valueToDispatch > 100) {
                                            valueToDispatch = 100;
                                        } else if (valueToDispatch < 0) {
                                            valueToDispatch = 0;
                                        }
                                        dispatch(
                                            modifyCartProductDiscountPercent({
                                                productIndex: index,
                                                discountPercent: valueToDispatch,
                                            }),
                                        );
                                    }}
                                    helperMessage={{
                                        enabled: row.discountPercent > 0,
                                        content: `- ${numberFormatINRCurrency(
                                            computeDiscountUsingPercentage({
                                                unitPrice: row.unitPrice,
                                                discountPercent: row.discountPercent,
                                            }),
                                        )}`,
                                        type: 'success',
                                    }}
                                />
                            </div>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default function CartTable(): ReactElement {
    const cartState = useSelector(cartSelector);
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell width="5%" />
                        <TableCell width="5%" padding={'none'} align="left">
                            S.No
                        </TableCell>
                        <TableCell width="40%" align="left">
                            Product
                        </TableCell>
                        <TableCell width="20%" align="right">
                            Qty
                        </TableCell>
                        <TableCell width="30%" align="right">
                            Sub-Total&nbsp;(₹)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartState.productsData.map((row, index) => {
                        return Row(row, index);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
