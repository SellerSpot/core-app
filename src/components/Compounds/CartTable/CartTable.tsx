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
import IconButton from 'components/Atoms/IconButton/IconButton';
import InputField from 'components/Atoms/InputField/InputField';
import { toNumber } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartSelector,
    modifyCartProductDiscountPercent,
    modifyCartProductName,
    modifyCartProductQuantity,
    modifyCartProductUnitPrice,
} from 'store/models/cart';
import { numberFormatINRCurrency } from 'utilities/general';
import { ICONS } from 'utilities/icons';
import styles from './CartTable.module.scss';
import { ICartProductsData } from './CartTable.types';

const Row = (row: ICartProductsData, index: number): ReactElement => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });
    const classes = useRowStyles();
    return (
        <>
            <TableRow className={classes.root} key={index + 'row'}>
                <TableCell>
                    <div
                        className={cn(styles.expandRowIcon, {
                            [styles.rotatedExpandRowIcon]: open,
                        })}
                    >
                        <IconButton
                            icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
                            size={'small'}
                            state={'grey'}
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                </TableCell>
                <TableCell padding={'none'} align="left">
                    {index + 1}
                </TableCell>
                {/* <TableCell align="right">{`${row.quantity} ${row.stockUnit}`}</TableCell> */}
                <TableCell align="left">{`${row.quantity} ${row.stockUnit} ${row.productName}`}</TableCell>
                <TableCell align="right">{row.subTotal}</TableCell>
            </TableRow>
            <TableRow key={index + 'collapsed'}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open}>
                        <div className={styles.collapsedDiv}>
                            <div className={styles.productName}>
                                <InputField
                                    label={'Product Name'}
                                    fullWidth={true}
                                    value={row.productName}
                                    onChange={(event) =>
                                        dispatch(
                                            modifyCartProductName({
                                                productIndex: index,
                                                productName: event.target.value,
                                            }),
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.propertyRow}>
                                <InputField
                                    label={'Quantity'}
                                    type={'number'}
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
                                    label={`Unit Price (per ${row.stockUnit})`}
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
                                    value={row.discountPercent + ''}
                                    onChange={(event) =>
                                        dispatch(
                                            modifyCartProductDiscountPercent({
                                                productIndex: index,
                                                discountPercent: +event.target.value,
                                            }),
                                        )
                                    }
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
                        <TableCell />
                        <TableCell padding={'none'} align="left">
                            S.No
                        </TableCell>
                        {/* <TableCell align="right">Qty</TableCell> */}
                        <TableCell width="60%" align="left">
                            Product
                        </TableCell>
                        <TableCell width="30%" align="right">
                            Sub-Total&nbsp;(₹)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartState.productsData.map((row, index) => {
                        console.log(numberFormatINRCurrency(row.unitPrice));

                        return Row(row, index);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
