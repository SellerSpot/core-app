import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    IconButton,
    IIconButtonProps,
    ITableCollapsedCustomRenderer,
    ITableProps,
    Table,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React from 'react';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import styles from './TaxGroupTable.module.scss';

interface IGetTablePropsProps {
    allTaxBrackets: ITaxBracketData[];
    isTableLoading: boolean;
    taxGroupSliderModalState: State<ITaxSettingPageState['taxGroupSection']['sliderModal']>;
    editItemClickHandler: (taxGroupData: ITaxBracketData) => IIconButtonProps['onClick'];
    deleteItemClickHandler: (taxGroupData: ITaxBracketData) => IIconButtonProps['onClick'];
}

export class TaxGroupTableService {
    static getTableProps = (props: IGetTablePropsProps): ITableProps<ITaxBracketData> => {
        // props
        const {
            allTaxBrackets,
            isTableLoading,
            deleteItemClickHandler,
            editItemClickHandler,
            taxGroupSliderModalState,
        } = props;

        const snoCustomRenderer: TTableCellCustomRenderer<ITaxBracketData> = (props) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
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
        const collapsedContentRenderer: ITableCollapsedCustomRenderer<ITaxBracketData> = (
            props,
        ) => {
            // props
            const { rowData } = props;
            const { group } = rowData;

            const tableProps: ITableProps<ITaxBracketData> = {
                data: group as ITaxBracketData[],
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

            return (
                <div className={styles.innerTableWrapper}>
                    <Table {...tableProps} />
                </div>
            );
        };
        const EmptyStatePrimaryCallToAction = () => {
            // handlers
            const handleOnClick = () => {
                taxGroupSliderModalState.merge({
                    mode: 'create',
                    prefillData: null,
                    showModal: true,
                });
            };

            return (
                <Button
                    label="NEW TAX GROUP"
                    theme="primary"
                    size="small"
                    onClick={handleOnClick}
                    variant="contained"
                    startIcon={<Icon icon={ICONS.outlineAdd} />}
                />
            );
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
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '100px',
                    customRenderer: actionsCustomRenderer,
                },
            ],
            collapsedContentRenderer,
            emptyStateMessage: 'You have not added any groups yet',
            emptyStatePrimaryCallToAction: <EmptyStatePrimaryCallToAction />,
        };
    };

    static deleteTaxGroup = async (props: { taxGroupId: string }): Promise<boolean> => {
        // props
        const { taxGroupId } = props;
        // request
        const { status } = await requests.catalogue.taxSettingsRequest.deleteTaxGroup(taxGroupId);
        // action
        return status;
    };
}
