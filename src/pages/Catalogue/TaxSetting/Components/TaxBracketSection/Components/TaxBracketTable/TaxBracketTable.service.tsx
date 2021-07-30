import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import {
    Button,
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import { ITaxBracketData } from '@sellerspot/universal-types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React from 'react';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import styles from './TaxBracketTable.module.scss';

interface IGetTableProps {
    allTaxBrackets: ITaxBracketData[];
    isTableLoading: boolean;
    taxBracketSliderModalState: State<ITaxSettingPageState['taxBracketSection']['sliderModal']>;
    editItemClickHandler: (taxBracketData: ITaxBracketData) => () => Promise<void>;
    deleteItemClickHandler: (taxBracketData: ITaxBracketData) => () => Promise<void>;
}

export class TaxBracketTableService {
    static getTableProps = (props: IGetTableProps): ITableProps<ITaxBracketData> => {
        // props
        const {
            allTaxBrackets,
            isTableLoading,
            deleteItemClickHandler,
            editItemClickHandler,
            taxBracketSliderModalState,
        } = props;

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
        const EmptyStatePrimaryCallToAction = () => {
            // handlers
            const handleOnClick = () => {
                taxBracketSliderModalState.merge({
                    mode: 'create',
                    prefillData: null,
                    showModal: true,
                });
            };

            return (
                <Button
                    label="NEW TAX BRACKET"
                    theme="primary"
                    size="small"
                    onClick={handleOnClick}
                    variant="contained"
                    startIcon={<Icon icon={ICONS.outlineAdd} />}
                />
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
            emptyStateMessage: 'You have not added any brackets yet',
            emptyStatePrimaryCallToAction: <EmptyStatePrimaryCallToAction />,
        };
    };

    static deleteTaxBracket = async (props: { taxBracketId: string }): Promise<boolean> => {
        // props
        const { taxBracketId } = props;
        // request
        const { status } = await requests.catalogue.taxSettingsRequest.deleteTaxBracket(
            taxBracketId,
        );
        // action
        return status;
    };
}
