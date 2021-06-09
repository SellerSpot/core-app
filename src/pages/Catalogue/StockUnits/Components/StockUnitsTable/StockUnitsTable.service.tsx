import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React from 'react';
import { ICONS } from '../../../../../utilities/utilities';
import styles from '../../StockUnits.module.scss';
import { IStockUnit, IStockUnitPageState } from '../../StockUnits.types';

export class StockUnitsTableService {
    static getTableProps = (props: {
        pageState: State<IStockUnitPageState>;
    }): ITableProps<IStockUnit> => {
        // props
        const {} = props;

        // components
        const sNoCustomRenderer: TTableCellCustomRenderer<IStockUnit> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<IStockUnit> = (props) => {
            // props
            const {} = props;

            // handlers
            const editItemClickHandler = () => {
                console.log('Edit Item Clicked');
            };
            const deleteItemClickHandler = () => {
                console.log('Delete Item Clicked');
            };

            // draw
            return (
                <div className={styles.rowActions}>
                    <span className={styles.link}>View Products</span>
                    <div className={styles.minActions}>
                        <ToolTip content="Edit">
                            <div>
                                <IconButton
                                    icon={<Icon icon={ICONS.baselineEdit} />}
                                    size="small"
                                    theme="primary"
                                    onClick={editItemClickHandler}
                                />
                            </div>
                        </ToolTip>
                        <ToolTip content="Delete">
                            <div>
                                <IconButton
                                    icon={<Icon icon={ICONS.outlineDeleteOutline} />}
                                    size="small"
                                    theme="danger"
                                    onClick={deleteItemClickHandler}
                                />
                            </div>
                        </ToolTip>
                    </div>
                </div>
            );
        };

        // draw
        return {
            data: [],
            shape: [
                {
                    columnName: 'SNo',
                    width: '5%',
                    align: 'center',
                    customRenderer: sNoCustomRenderer,
                },
                {
                    columnName: 'Unit',
                    width: '70%',
                    dataKey: 'unit',
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    customRenderer: actionsCustomRenderer,
                },
            ],
        };
    };
}
