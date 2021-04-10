import React, { ReactElement } from 'react';
import style from './Table.module.scss';
import { ITableProps } from './Table.types';
import {
    makeStyles,
    Paper,
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { isUndefined } from 'lodash';

// styling for the body row of table
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        cursor: 'pointer',
    },
});

export default function Table(props: ITableProps): ReactElement {
    // creating class instance based on specified requirements
    const classes = useRowStyles();
    return (
        <TableContainer component={Paper}>
            <MUITable stickyHeader={props.stickyHeader}>
                <TableHead>
                    <TableRow>
                        {props.headers.map((header, index) => {
                            return (
                                <TableCell
                                    key={'tableHeader' + index}
                                    padding={header.padding}
                                    align={header.align}
                                    width={header.width}
                                >
                                    {header.content}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                {/* <TableBody>
                    {props.rowData.map((row, index) => {
                        return (
                            <>
                                <TableRow
                                    className={classes.root}
                                    key={'bodyRow' + index}
                                    onClick={props.bodyRowOnClick}
                                >
                                    {row.map((cell, index) => {
                                        return (
                                            <TableCell key={'bodyCell' + index}>
                                                {cell.content}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                                {isUndefined(row.collapsedContent) ? null : (
                                    <TableRow key={'bodyRowCollapsed' + index}></TableRow>
                                )}
                            </>
                        );
                    })}
                </TableBody> */}
            </MUITable>
        </TableContainer>
    );
}
