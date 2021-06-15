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
import { times } from 'lodash';
import { IBrandData } from '@sellerspot/universal-types';

export class BrandsTableService {
    static getTableProps = (
        brands: IBrandsPageState['brands'],
        isLoading: boolean,
    ): ITableProps<IBrandsPageState['brands'][0]> => {
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

        // return
        return {
            data: times(100, (num): IBrandData => {
                return {
                    id: `${num}`,
                    name: 'Sample',
                };
            }),
            isLoading,
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
                    width: '65%',
                },
                {
                    columnName: 'Actions',
                    align: 'center',
                    width: '30%',
                    customRenderer: actionsCustomRenderer,
                },
            ],
        };
    };
}
