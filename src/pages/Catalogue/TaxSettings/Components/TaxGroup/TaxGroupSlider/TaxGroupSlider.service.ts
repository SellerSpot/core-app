import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';
import { ITaxGroupSliderForm } from './TaxGroupSlider.types';

export class TaxGroupSliderService {
    private static validationSchema: yup.SchemaOf<ITaxGroupSliderForm> = yup.object({
        name: yup.string().required('Tax Group name is required'),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        (fieldName: keyof ITaxGroupSliderForm) =>
        (values: ITaxGroupSliderForm['name']): string => {
            const requiredSchema: yup.SchemaOf<ITaxGroupSliderForm['name']> = yup.reach(
                TaxGroupSliderService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
                TaxGroupSliderService.showGeneralErrorNotify(e?.message);
            }
        };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<ITaxGroupSliderForm['name']>,
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

    // static createNewTaxGroup = async (values: ITaxGroupSliderForm): Promise<ITaxGroupData> => {
    //     const { name } = values;
    //     const requestData: ICreateTaxGroupRequest = {
    //         name,
    //     };
    //     const { data, status, error } = await requests.catalogue.stockUnitRequest.createNewTaxGroup(
    //         requestData,
    //     );
    //     if (status) {
    //         return data;
    //     }
    //     TaxGroupSliderService.showGeneralErrorNotify(error.message);
    //     return null;
    // };

    // static editTaxGroup = async (props: { name: string; id: string }): Promise<ITaxGroupData> => {
    //     const { name, id } = props;
    //     const { data, status, error } = await requests.catalogue.stockUnitRequest.editTaxGroup({
    //         name,
    //         id,
    //     });
    //     if (status) {
    //         return data;
    //     }
    //     TaxGroupSliderService.showGeneralErrorNotify(error.message);
    //     return null;
    // };
}
