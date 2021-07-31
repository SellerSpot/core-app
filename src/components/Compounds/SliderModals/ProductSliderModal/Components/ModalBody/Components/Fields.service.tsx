import React from 'react';
import { ISelectOption } from '@sellerspot/universal-components';
import { IBrandData, IStockUnitData } from '@sellerspot/universal-types';
import styles from './Fields.module.scss';
import { find, getNodeAtPath, TreeItem } from 'react-sortable-tree';
import { getNodeKey } from 'utilities/general';

interface IConstructCategoryAncestryProps {
    category: TreeItem;
    treeData: TreeItem[];
}
export class ProductSliderModalFieldsService {
    static formatBrandDataForSelectComponent = (brand: IBrandData): ISelectOption => {
        return {
            label: brand.name,
            value: brand.id,
        };
    };

    static formatStockUnitDataForSelectComponent = (stockUnit: IStockUnitData): ISelectOption => {
        // component
        const stockUnitSelectLabel = (
            <div className={styles.stockUnitSelectLabel}>
                <p>{stockUnit.name}</p>
                <p>
                    <b>{`  [${stockUnit.unit}]`}</b>
                </p>
            </div>
        );
        return {
            labelToShow: stockUnitSelectLabel,
            label: stockUnit.name,
            value: stockUnit.id,
        };
    };

    // used to construct the string from root to category
    static constructCategoryAncestry = (props: IConstructCategoryAncestryProps): string[] => {
        // props
        const { category, treeData } = props;
        const ancestry: string[] = [];
        ancestry.unshift(category.title as string);
        // finding the current category
        const categoryData = find({
            getNodeKey,
            searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
            treeData,
            searchQuery: category.id,
        }).matches[0];

        // iterating throught the paths to find the parents
        while (categoryData?.path.length > 0) {
            categoryData.path.pop();
            const nodeAtPath = getNodeAtPath({
                getNodeKey,
                path: categoryData.path,
                treeData,
                ignoreCollapsed: false,
            }).node;
            nodeAtPath.title && ancestry.unshift(nodeAtPath.title as string);
        }
        return ancestry;
    };
}
