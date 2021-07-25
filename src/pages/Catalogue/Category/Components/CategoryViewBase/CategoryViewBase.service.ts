import { requests } from 'requests/requests';

interface IEditChildrenOrderProps {
    parentId: string;
    childrenOrder: string[];
}

interface IEditCategoryPositionProps {
    categoryId: string;
    oldParentId: string;
    newParentId: string;
}

interface IDeleteCategoryProps {
    categoryId: string;
}

export class CategoryViewBaseService {
    static editChildrenOrder = async (props: IEditChildrenOrderProps): Promise<void> => {
        await requests.catalogue.categoryRequest.editChildrenOrder(props);
    };
    static editCategoryPosition = async (props: IEditCategoryPositionProps): Promise<void> => {
        await requests.catalogue.categoryRequest.editCategoryPosition(props);
    };
    static deleteCategory = async (props: IDeleteCategoryProps): Promise<void> => {
        await requests.catalogue.categoryRequest.deleteCategory(props);
    };
}
