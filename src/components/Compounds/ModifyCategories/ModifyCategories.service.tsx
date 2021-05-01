import { Button, IconButton, InputField, ToolTip } from '@sellerspot/universal-components';
import React, { ReactElement } from 'react';
import { TreeItem } from 'react-sortable-tree';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps } from './ModifyCategories';
import { ICONS } from 'utilities/icons';

export class ModifyCategoriesService {
    static convertToTreeData = (
        categoriesData: IModifyCategoriesProps['categoriesData'],
    ): TreeItem[] => {
        return categoriesData.map((category) => {
            const { name, subCategories } = category;
            return {
                title: (
                    <div className={styles.categoryNameField}>
                        <InputField
                            size="small"
                            disableHelperTextPlaceholderPadding
                            theme="primary"
                            value={name}
                        />
                    </div>
                ),
                children: !!subCategories
                    ? ModifyCategoriesService.convertToTreeData(subCategories)
                    : null,
            };
        });
    };

    static getSortableTreeButtons = (): ReactElement[] => {
        return [
            <div key={'controls'} className={styles.controls}>
                <Button
                    label={'Add Category'}
                    theme={'primary'}
                    size="small"
                    startIcon={<ICONS.MdAdd />}
                    variant="text"
                />
                <ToolTip content={'Delete Category'}>
                    <div>
                        <IconButton icon={<ICONS.MdDelete />} theme="danger" size="small" />
                    </div>
                </ToolTip>
            </div>,
        ];
    };
}
