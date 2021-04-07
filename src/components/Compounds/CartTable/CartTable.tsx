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
import { cartSelector, modifyCartProductQuantity } from 'store/models/cart';
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
                                    dispatch(
                                        modifyCartProductQuantity({
                                            productIndex: index,
                                            productQuantity: toNumber(event.target.value),
                                        }),
                                    )
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
    const cartState = useSelector(cartSelector);
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
                    {cartState.productsData.map((row, index) => {
                        return Row(row, index);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
