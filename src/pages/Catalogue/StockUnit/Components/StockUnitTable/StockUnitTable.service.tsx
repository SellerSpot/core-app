import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Chip,
    IChipProps,
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './StockUnitTable.module.scss';
import { IStockUnitPageState } from '../../StockUnit.types';
import { IStockUnitData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class StockUnitTableService {
    static getTableProps = (props: {
        pageState: State<IStockUnitPageState>;
        deleteItemClickHandler: (stockUnitData: IStockUnitData) => () => Promise<void>;
        editItemClickHandler: (stockUnitData: IStockUnitData) => () => Promise<void>;
    }): ITableProps<IStockUnitData> => {
        // props
        const { pageState, deleteItemClickHandler, editItemClickHandler } = props;

        // components
        const sNoCustomRenderer: TTableCellCustomRenderer<IStockUnitData> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const typeCustomRenderer: TTableCellCustomRenderer<IStockUnitData> = (props) => {
            // props
            const { rowData } = props;
            // compute
            const label = rowData.isDefault ? 'default' : 'custom';
            const theme: IChipProps['theme'] = rowData.isDefault ? 'auto' : 'primary';
            // draw
            return <Chip theme={theme} label={label} />;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<IStockUnitData> = (props) => {
            // props
            const { rowData } = props;

            // draw
            return (
                <div className={styles.rowActions}>
                    {!rowData.isDefault && (
                        <div className={styles.minActions}>
                            <ToolTip content="Edit">
                                <div>
                                    <IconButton
                                        icon={<Icon icon={ICONS.baselineEdit} />}
                                        size="small"
                                        theme="primary"
                                        onClick={editItemClickHandler(rowData)}
                                    />
                                </div>
                            </ToolTip>
                            <ToolTip content="Delete">
                                <div>
                                    <IconButton
                                        icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                                        size="small"
                                        theme="danger"
                                        onClick={deleteItemClickHandler(rowData)}
                                    />
                                </div>
                            </ToolTip>
                        </div>
                    )}
                </div>
            );
        };

        // draw
        return {
            data: pageState.stockUnits.get(),
            isLoading: pageState.isStockUnitTableLoading.get(),
            shape: [
                {
                    columnName: 'SNo',
                    width: '5%',
                    align: 'center',
                    customRenderer: sNoCustomRenderer,
                },
                {
                    columnName: 'Unit',
                    dataKey: 'unit',
                    width: '80px',
                    align: 'center',
                },
                {
                    columnName: 'Name',
                    dataKey: 'name',
                },
                {
                    columnName: 'Type',
                    align: 'center',
                    width: '94px',
                    customRenderer: typeCustomRenderer,
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '100px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
        };
    };

    static deleteStockUnit = async (stockUnitId: string): Promise<boolean> => {
        // request
        const { status } = await requests.catalogue.stockUnitRequest.deleteStockUnit(stockUnitId);
        // action
        return status;
    };
}
