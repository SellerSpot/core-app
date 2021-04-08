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
import ExpandableCard from 'components/Atoms/ExpandableCard/ExpandableCard';
import IconButton from 'components/Atoms/IconButton/IconButton';
import InputField from 'components/Atoms/InputField/InputField';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartSelector,
    modifyCartProductDiscountPercent,
    modifyCartProductName,
    modifyCartProductQuantity,
    modifyCartProductUnitPrice,
} from 'store/models/cart';
import { computeDiscountUsingPercentage } from 'utilities/businessLogic';
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
        },
    });
    const classes = useRowStyles();
    return (
        <>
            <TableRow className={classes.root} key={index + 'row'}>
                <TableCell>
                    <div
                        className={cn(styles.expandRowIcon, {
                            [styles.rotatedExpandRowIcon]: openProductDetail,
                        })}
                    >
                        <IconButton
                            icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
                            size={'small'}
                            state={'grey'}
                            onClick={() => setOpenProductDetail(!openProductDetail)}
                        />
                    </div>
                </TableCell>
                <TableCell padding={'none'} align="left">
                    {index + 1}
                </TableCell>
                {/* <TableCell align="right">{`${row.quantity} ${row.stockUnit}`}</TableCell> */}
                <TableCell align="left">{`${row.quantity} ${row.stockUnit} ${row.productName}`}</TableCell>
                <TableCell align="right">{numberFormatINRCurrency(row.subTotal)}</TableCell>
            </TableRow>
            <TableRow key={index + 'collapsed'}>
                <TableCell style={{ paddingBottom: '10px', paddingTop: 0 }} colSpan={5}>
                    <Collapse in={openProductDetail}>
                        <div className={styles.collapsedDiv}>
                            <div className={styles.productName}>
                                <InputField
                                    label={'Product Name'}
                                    fullWidth={true}
                                    value={row.productName}
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
                                    label={`Unit Price (per ${row.stockUnit})`}
                                    helperMessage={{
                                        enabled: true,
                                        content: `${numberFormatINRCurrency(
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
                                    value={row.discountPercent + ''}
                                    onChange={(event) =>
                                        dispatch(
                                            modifyCartProductDiscountPercent({
                                                productIndex: index,
                                                discountPercent: +event.target.value,
                                            }),
                                        )
                                    }
                                    helperMessage={{
                                        enabled: row.discountPercent > 0,
                                        content: `${numberFormatINRCurrency(
                                            computeDiscountUsingPercentage({
                                                unitPrice: row.unitPrice,
                                                discountPercent: row.discountPercent,
                                            }),
                                        )}`,
                                        type: 'warning',
                                    }}
                                />
                            </div>
                            <div className={styles.taxBracketCard}>
                                <ExpandableCard
                                    expanded={openTaxDetail}
                                    content={{
                                        summaryContent: (
                                            <div className={styles.summaryContent}>
                                                <h5>Tax Information</h5>
                                                <div
                                                    className={cn(
                                                        styles.expandTaxInformationCardIcon,
                                                        {
                                                            [styles.rotatedExpandTaxInformationCardIcon]: openTaxDetail,
                                                        },
                                                    )}
                                                >
                                                    <IconButton
                                                        icon={<ICONS.OTHER.EXPAND_MENU_DOWN />}
                                                        size={'small'}
                                                        state={'grey'}
                                                        onClick={() =>
                                                            setOpenTaxDetail(!openTaxDetail)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ),
                                        detailsContent: <h6>Detailed Tax Information</h6>,
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
                        return Row(row, index);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
