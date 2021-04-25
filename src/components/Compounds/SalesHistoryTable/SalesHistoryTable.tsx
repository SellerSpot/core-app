import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { omit } from 'lodash';
import { ITableProps, ITableRow, Table } from '@sellerspot/universal-components';
import { ISalesHistoryTableProps } from './SalesHistoryTable.types';
import { SalesHistoryService } from './SalesHistoryTable.service';
import { SalesHistoryProducts } from './Components/SalesHistoryProducts';
// import styles from './SalesHistoryTable.module.scss';

export { ISalesHistoryTableProps } from './SalesHistoryTable.types';

const getTableBody = (props: {
    toggleRowExpansion: (rowIndex: number) => void;
    saleHistory: ISalesHistoryTableProps['saleHistory'];
}): ITableRow[] => {
    const { saleHistory, toggleRowExpansion } = props;
    return saleHistory.map((sale, saleIndex) => {
        const handleRowOnClick = () => {
            toggleRowExpansion(saleIndex);
        };

        return {
            cells: SalesHistoryService.getCells(omit(sale, 'products')),
            onClick: handleRowOnClick,
            collapsedContent: <SalesHistoryProducts products={sale['products']} />,
        };
    });
};

export const SalesHistoryTable = (props: ISalesHistoryTableProps): ReactElement => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [height, setHeight] = useState(250);
    const { saleHistory } = props;

    useEffect(() => {
        const height = containerRef?.current?.clientHeight ?? 250;
        setHeight(height);
        setLoading(false);
    }, []);

    const tableBody: ITableProps['body'] = ({ toggleRowExpansion }) => {
        return getTableBody({
            saleHistory,
            toggleRowExpansion,
        });
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={containerRef}
        >
            {loading ? (
                <h4>Loading Table</h4>
            ) : (
                <Table
                    maxHeight={height}
                    hasExpandableRows
                    unmountOnCollapse
                    stickyHeader
                    headers={SalesHistoryService.headers}
                    body={tableBody}
                />
            )}
        </div>
    );
};
