import { TableCellProps } from '@material-ui/core';
import { ReactElement } from 'react';

interface ITableCell {
    width?: TableCellProps['width'];
    padding?: TableCellProps['padding'];
    align?: TableCellProps['align'];
    content?: TableCellProps['children'];
}

interface ITableBody {
    rowData: ITableCell[][];
    collapsedContent?: TableCellProps['children'];
    collapseContent?: boolean;
}

export interface ITableProps {
    stickyHeader?: boolean;
    headers?: ITableCell[];
    body?: ITableBody;
}
