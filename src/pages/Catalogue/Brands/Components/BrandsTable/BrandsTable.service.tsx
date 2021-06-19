import {
    IconButton,
    ITableProps,
    ToolTip,
    TTableCellCustomRenderer,
} from '@sellerspot/universal-components';
import React from 'react';
import styles from './BrandsTable.module.scss';
import { IBrandsPageState } from '../../Brands.types';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';
import { State } from '@hookstate/core';
import { IBrandData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class BrandsTableService {
    static getTableProps = (props: {
        pageState: State<IBrandsPageState>;
        deleteItemClickHandler: (brandData: IBrandData) => () => Promise<void>;
        editItemClickHandler: (brandData: IBrandData) => () => Promise<void>;
    }): ITableProps<IBrandsPageState['brands'][0]> => {
        // props
        const { pageState, deleteItemClickHandler, editItemClickHandler } = props;
        // custom renderers
        const snoCustomRenderer: TTableCellCustomRenderer<IBrandsPageState['brands'][0]> = (
            props,
        ) => {
            // props
            const { rowIndex } = props;
            // draw
            return rowIndex + 1;
        };
        const actionsCustomRenderer: TTableCellCustomRenderer<IBrandsPageState['brands'][0]> = (
            props,
        ) => {
            // props
            const { rowData } = props;

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
            data: pageState.brands.get(),
            isLoading: pageState.isBrandsTableLoading.get(),
            shape: [
                {
                    columnName: 'Sno',
                    align: 'center',
                    width: '5%',
                    customRenderer: snoCustomRenderer,
                },
                {
                    dataKey: 'name',
                    columnName: 'Brand Name',
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

    static deleteBrand = async (brandId: string): Promise<boolean> => {
        const { status } = await requests.catalogue.brandRequest.deleteBrand(brandId);
        return status;
    };
}
