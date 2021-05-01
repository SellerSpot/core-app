import { InputField } from '@sellerspot/universal-components';
import React from 'react';
import { TreeItem } from 'react-sortable-tree';
import styles from './ModifyCategories.module.scss';
import { IModifyCategoriesProps } from './ModifyCategories';

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
}
