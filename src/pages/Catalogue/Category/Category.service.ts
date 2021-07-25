import { TreeItem } from 'react-sortable-tree';
import { requests } from 'requests/requests';

export class CategoryService {
    static getAllCategories = async (): Promise<TreeItem[]> => {
        const { data, status } = await requests.catalogue.categoryRequest.getAllCategory();
        if (status) {
            return data;
        }
        return [];
    };
}
