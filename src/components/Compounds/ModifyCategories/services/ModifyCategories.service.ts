import * as yup from 'yup';

export class ModifyCategoriesService {
    static validateCategoryName = (title: string): string => {
        const validationSchema = yup.string().required('Category Name is required');
        try {
            validationSchema.validateSync(title);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
        }
        return null;
    };
}
