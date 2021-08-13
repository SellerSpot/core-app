import { ISelectOption } from '@sellerspot/universal-components';
import { IBrandData, IStockUnitData } from '@sellerspot/universal-types';
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

    static formatStockUnitDataForSelectComponent = (
        stockUnit: IStockUnitData,
    ): ISelectOption<IStockUnitData> => {
        return {
            label: stockUnit.name,
            value: stockUnit.id,
            meta: stockUnit,
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
