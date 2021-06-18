import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';
import { IStockUnitSliderForm } from './StockUnitSlider.types';

export class StockUnitSliderService {
    private static validationSchema: yup.SchemaOf<IStockUnitSliderForm> = yup.object({
        name: yup.string().required('Brand name is required'),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        (fieldName: keyof IStockUnitSliderForm) =>
        (values: IStockUnitSliderForm['name']): string => {
            const requiredSchema: yup.SchemaOf<IStockUnitSliderForm['name']> = yup.reach(
                StockUnitSliderService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
                StockUnitSliderService.showGeneralErrorNotify(e?.message);
            }
        };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<IStockUnitSliderForm['name']>,
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
