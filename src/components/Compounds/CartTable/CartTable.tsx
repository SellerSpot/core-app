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
import { ICONS } from 'utilities/icons';
import create from 'zustand';
import styles from './CartTable.module.scss';
import { ICartTableData, TCartTableZustandStore } from './CartTable.types';

const cartStore = create<TCartTableZustandStore>((set, get) => ({
    cartProducts: [
        {
            qty: 12,
            productName: 'Tomatoes 1KG',
            subTotal: 200,
        },
        {
            qty: 2,
            productName: 'Potatoes 1KG',
            subTotal: 452,
        },
    ],
    changeProductQty: (newQty, index) => {
        const cartProductsCopy = get().cartProducts;
        cartProductsCopy[index].qty = newQty;
        set({ cartProducts: cartProductsCopy });
    },
}));

const Row = (row: ICartTableData, index: number): ReactElement => {
    const [open, setOpen] = useState(false);
    const changeProductQty = cartStore((state) => state.changeProductQty);
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
                    <IconButton
                        className={cn(styles.expandRowIcon, {
                            [styles.rotatedExpandRowIcon]: open,
                        })}
                        icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
                        size={'small'}
                        state={'grey'}
                        onClick={() => setOpen(!open)}
                    />
                </TableCell>
                <TableCell padding={'none'} align="right">
                    {index + 1}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="right">{row.subTotal}</TableCell>
            </TableRow>
            <TableRow key={index + 'collapsed'}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open}>
                        <div className={styles.collapsedDiv}>
                            <InputField
                                label={'Quantity'}
                                type={'number'}
                                value={row.qty.toString()}
                                onChange={(event) =>
                                    changeProductQty(toNumber(event.target.value), index)
                                }
                            />
                            <InputField label={'Price'} />
                            <InputField label={'Discount (%)'} />
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default function CartTable(): ReactElement {
    const tableData = cartStore((state) => state.cartProducts);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell padding={'none'} align="right">
                            S.No
                        </TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell width="60%" align="left">
                            Product
                        </TableCell>
                        <TableCell width="30%" align="right">
                            Sub-Total&nbsp;(₹)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => {
                        return Row(row, index);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
