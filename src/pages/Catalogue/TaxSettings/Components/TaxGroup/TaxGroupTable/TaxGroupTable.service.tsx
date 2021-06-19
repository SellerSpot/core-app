import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    IconButton,
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import styles from './TaxGroupTable.module.scss';
import React from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxBracket, ITaxGroup, ITaxSettingsState } from '../../../TaxSettings.types';

export class TaxGroupsTableService {
    static getTableProps = (props: {
        pageState: State<ITaxSettingsState>;
    }): ITableProps<ITaxGroup> => {
        // props
        const {} = props;

        const snoCustomRenderer: TTableCellCustomRenderer<ITaxGroup> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<ITaxGroup> = (props) => {
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
                    <span className={styles.link}>View Product</span>
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
        const collapsedContentRenderer: ITableCollapsedCustomRenderer<ITaxGroup> = (props) => {
            // props
            const { rowData } = props;
            const { brackets } = rowData;

            const tableProps: ITableProps<ITaxBracket> = {
                data: brackets,
                shape: [
                    {
                        dataKey: 'name',
                        columnName: 'Bracket',
                        align: 'left',
                        width: '90%',
                    },
                    {
                        dataKey: 'rate',
                        columnName: 'Rate',
                        align: 'right',
                        width: '10%',
                    },
                ],
                size: 'small',
            };

            return <Table {...tableProps} />;
        };

        // draw
        return {
            // data: pageState.taxGroups.get(),
            data: [
                {
                    name: 'LALA',
                    brackets: [
                        {
                            name: 'sdfasdf',
                            rate: 23,
                            isStateTax: false,
                        },
                    ],
                },
            ],
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
                    width: '65%',
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '198px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
            collapsedContentRenderer,
        };
    };
}
