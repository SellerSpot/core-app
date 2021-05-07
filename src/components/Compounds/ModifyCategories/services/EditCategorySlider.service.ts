import { TreeItem } from 'react-sortable-tree';
import * as yup from 'yup';
import { IEditCategoryForm } from '../Components/CategoriesView/Components/EditCategorySlider.tsx/EditCategory.types';
import { ModifyCategoriesService } from './ModifyCategories.service';

export class EditCategorySliderService {
    static validateField = (props: {
        value: string;
        fieldName: keyof IEditCategoryForm;
        treeData: TreeItem[];
        path: string[];
    }): string => {
        const { fieldName, value, path, treeData } = props;
        // schema to validate the form with
        const validationSchema: yup.SchemaOf<IEditCategoryForm> = yup.object({
            categoryName: yup.string().required('Category Name is required'),
            categoryDescription: yup.string(),
        });
        const requiredSchema: yup.AnySchema = yup.reach(validationSchema, fieldName);
        try {
            requiredSchema.validateSync(value);

            if (fieldName === 'categoryName') {
                const isInvalidName = ModifyCategoriesService.isThereASibilingNodeWithSameTitle({
                    titleOfCurrentNode: value,
                    treeData,
                    pathOfCurrentNode: path,
                });

                if (isInvalidName) {
                    return `The category ${value} already exists at the same level`;
                }
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
        }
    };
}
