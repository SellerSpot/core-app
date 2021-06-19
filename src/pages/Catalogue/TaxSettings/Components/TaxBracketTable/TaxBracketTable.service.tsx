import { State } from '@hookstate/core';
import {
    Chip,
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React from 'react';
import styles from './TaxBracketTable.module.scss';
import { ITaxBracket, ITaxSettingsState } from '../../TaxSettings.types';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';

export class TaxBracketsTableService {
    static getTableProps = (props: {
        pageState: State<ITaxSettingsState>;
    }): ITableProps<ITaxBracket> => {
        // props
        const { pageState } = props;

        // custom renderes
        const rateTypeCustomRenderer: TTableCellCustomRenderer<ITaxBracket> = (props) => {
            // props
            const {} = props;
            // draw
            return <Chip label="State Tax" />;
        };
        const snoCustomRenderer: TTableCellCustomRenderer<ITaxBracket> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<ITaxBracket> = (props) => {
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

        // draw
        return {
            data: pageState.taxBrackets.get(),
            // data: [
            //     {
            //         name: 'sdfasdfasd',
            //         rate: 43,
            //         isStateTax: true,
            //     },
            // ],
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
                    width: '50%',
                },
                {
                    dataKey: 'rate',
                    columnName: 'Rate',
                    align: 'right',
                    width: '10%',
                },
                {
                    columnName: 'Type',
                    align: 'center',
                    width: '74px',
                    customRenderer: rateTypeCustomRenderer,
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
