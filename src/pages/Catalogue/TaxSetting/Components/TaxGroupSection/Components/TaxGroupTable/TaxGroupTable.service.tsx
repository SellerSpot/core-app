import Icon from '@iconify/react';
import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import React from 'react';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import styles from './TaxGroupTable.module.scss';
import {
    IconButton,
    IIconButtonProps,
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';

interface IGetTablePropsProps {
    allTaxBrackets: ITaxGroupData[];
    isTableLoading: boolean;
    editItemClickHandler: (taxGroupData: ITaxGroupData) => IIconButtonProps['onClick'];
    deleteItemClickHandler: (taxGroupData: ITaxGroupData) => IIconButtonProps['onClick'];
}

export class TaxGroupTableService {
    static getAllTaxGroup = async (): Promise<ITaxGroupData[]> => {
        const { data, status } = await requests.catalogue.taxSettingsRequest.getAllTaxGroup();
        if (status) {
            return data;
        }
        return [];
    };

    static getTableProps = (props: IGetTablePropsProps): ITableProps<ITaxGroupData> => {
        // props
        const { allTaxBrackets, isTableLoading, deleteItemClickHandler, editItemClickHandler } =
            props;

        const snoCustomRenderer: TTableCellCustomRenderer<ITaxGroupData> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<ITaxGroupData> = (props) => {
            // props
            const { rowData } = props;

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
        const collapsedContentRenderer: ITableCollapsedCustomRenderer<ITaxGroupData> = (props) => {
            // props
            const { rowData } = props;
            const { bracket } = rowData;

            const tableProps: ITableProps<ITaxBracketData> = {
                data: bracket,
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

    static deleteTaxGroup = async (taxGroupId: string): Promise<boolean> => {
        const { status } = await requests.catalogue.taxSettingsRequest.deleteTaxGroup(taxGroupId);
        return status;
    };
}
