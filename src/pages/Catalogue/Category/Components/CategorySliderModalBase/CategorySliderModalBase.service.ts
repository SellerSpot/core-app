import { TreeItem } from 'react-sortable-tree';
import { requests } from 'requests/requests';

interface ICreateCategoryProps {
    title: string;
    parentId: string;
}

interface IUpdateCategoryProps {
    categoryId: string;
    title: string;
}

export class CategorySliderModalBaseService {
    static createCategory = async (props: ICreateCategoryProps): Promise<TreeItem> => {
        // request
        const { data, status } = await requests.catalogue.categoryRequest.createNewCategory(props);
        if (status) {
            return data;
        }
        return null;
    };
    static updateCategory = async (props: IUpdateCategoryProps): Promise<TreeItem> => {
        // request
        const { data, status } = await requests.catalogue.categoryRequest.editCategory(props);
        if (status) {
            return data;
        }
        return null;
    };
}
