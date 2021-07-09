import Icon from '@iconify/react';
import {
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import React from 'react';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import styles from './TaxBracketTable.module.scss';

interface IGetTableProps {
    allTaxBrackets: ITaxBracketData[];
    isTableLoading: boolean;
    editItemClickHandler: (taxBracketData: ITaxBracketData) => () => Promise<void>;
    deleteItemClickHandler: (taxBracketData: ITaxBracketData) => () => Promise<void>;
}

export class TaxBracketTableService {
    static getTableProps = (props: IGetTableProps): ITableProps<ITaxBracketData> => {
        // props
        const { allTaxBrackets, isTableLoading, deleteItemClickHandler, editItemClickHandler } =
            props;

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
            const { rowData } = props;

            // draw
            return (
                <div className={styles.rowActions}>
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
                </div>
            );
        };

        // return
        return {
            data: allTaxBrackets,
            isLoading: isTableLoading,
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
                    width: '100px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
        };
    };

    static deleteTaxBracket = async (props: { taxBracketId: string }): Promise<boolean> => {
        // props
        const { taxBracketId } = props;
        const { status } = await requests.catalogue.taxSettingsRequest.deleteTaxBracket(
            taxBracketId,
        );
        return status;
    };
}
