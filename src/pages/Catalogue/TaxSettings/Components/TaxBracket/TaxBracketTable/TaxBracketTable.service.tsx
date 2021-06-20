import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import React from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxSettingsState } from '../../../TaxSettings.types';
import styles from './TaxBracketTable.module.scss';

export class TaxBracketsTableService {
    static getTableProps = (props: {
        pageState: State<ITaxSettingsState>;
    }): ITableProps<ITaxBracketData> => {
        // props
        const { pageState } = props;

        // custom renderes
        const snoCustomRenderer: TTableCellCustomRenderer<ITaxBracketData> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const rateCustomRenderer: TTableCellCustomRenderer<ITaxBracketData> = (props) => {
            // props
            const { rowData } = props;
            return `${rowData['rate']}%`;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<ITaxBracketData> = (props) => {
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
            data: pageState.taxBrackets.get(),
            isLoading: pageState.isTaxBracketTableLoading.get(),
            shape: [
                {
                    columnName: 'S.No',
                    align: 'center',
                    width: '5%',
                    customRenderer: snoCustomRenderer,
                },
                {
                    dataKey: 'name',
                    columnName: 'Bracket Name',
                    align: 'left',
                },
                {
                    dataKey: 'rate',
                    columnName: 'Rate',
                    align: 'center',
                    width: '68px',
                    customRenderer: rateCustomRenderer,
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '198px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
        };
    };
}
