import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';
import { IProductSliderForm } from './ProductSlider.types';

export class ProductSliderService {
    private static validationSchema: yup.SchemaOf<IProductSliderForm> = yup.object({
        name: yup.string().required('Brand name is required'),
        barcode: yup.string(),
        brand: yup.string(),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        (fieldName: keyof IProductSliderForm) =>
        (values: IProductSliderForm): string => {
            const requiredSchema: yup.SchemaOf<IProductSliderForm['name']> = yup.reach(
                ProductSliderService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
                ProductSliderService.showGeneralErrorNotify(e?.message);
            }
        };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<IProductSliderForm>,
    ): IInputFieldProps['helperMessage'] & {
        theme: IInputFieldProps['theme'];
    } => {
        // props
        const { error, submitError, dirtySinceLastSubmit, dirty } = meta;
        let { enabled, content, type }: IInputFieldProps['helperMessage'] = {
            enabled: false,
            content: 'No Content',
            type: 'success',
        };
        let theme: IInputFieldProps['theme'] = 'primary';

        // compute
        if ((error || submitError) && (dirty || dirtySinceLastSubmit)) {
            type = 'error';
            content = error || submitError;
            enabled = true;
            theme = 'danger';
        }

        // return
        return {
            enabled,
            content,
            type,
            theme,
        };
    };
}
