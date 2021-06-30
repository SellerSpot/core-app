import {
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
    showNotify,
} from '@sellerspot/universal-components';
import { ICreateTaxGroupRequest, ITaxGroupData } from '@sellerspot/universal-types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import * as yup from 'yup';
import { ITaxGroupSliderForm } from './TaxGroupSlider.types';

export class TaxGroupSliderService {
    private static ISelectOptionValidationSchema: yup.SchemaOf<ISelectOption> = yup.object({
        label: yup.string(),
        value: yup.string(),
    });

    private static validationSchema: yup.SchemaOf<ITaxGroupSliderForm> = yup.object({
        name: yup.string().required('Tax Group name is required'),
        taxBrackets: yup
            .array()
            .of(TaxGroupSliderService.ISelectOptionValidationSchema)
            .min(1, 'Please choose atleast one tax bracket for the tax group')
            .required('Please select the tax brackets for this tax group'),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        (fieldName: keyof ITaxGroupSliderForm) =>
        (values: ITaxGroupSliderForm[typeof fieldName]): string => {
            const requiredSchema: yup.SchemaOf<ITaxGroupSliderForm[typeof fieldName]> = yup.reach(
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
        meta: FieldMetaState<ITaxGroupSliderForm>,
    ): IInputFieldProps['helperMessage'] & {
        theme: IInputFieldProps['theme'];
    } => {
        // props
        const { error, submitError, touched } = meta;
        let { enabled, content, type }: IInputFieldProps['helperMessage'] = {
            enabled: false,
            content: 'No Content',
            type: 'success',
        };
        let theme: IInputFieldProps['theme'] = 'primary';

        // compute
        if ((error || submitError) && touched) {
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
    static getSpecialSelectFieldProps = (
        meta: FieldMetaState<ITaxGroupSliderForm>,
    ): IAsyncCreatableSelectProps['helperMessage'] => {
        // props
        const { error, submitError, touched } = meta;
        let { enabled, content, type }: IAsyncCreatableSelectProps['helperMessage'] = {
            enabled: false,
            content: 'No Content',
            type: 'message',
        };
        // compute
        if ((error || submitError) && touched) {
            type = 'error';
            content = error || submitError;
            enabled = true;
        }

        // return
        return {
            enabled,
            content,
            type,
        };
    };

    static createNewTaxGroup = async (values: ITaxGroupSliderForm): Promise<ITaxGroupData> => {
        const { name, taxBrackets } = values;
        const requestData: ICreateTaxGroupRequest = {
            name,
            bracket: taxBrackets.map((bracket) => bracket.value),
        };
        const { data, status, error } =
            await requests.catalogue.taxSettingsRequest.createNewTaxGroup(requestData);
        if (status) {
            return data;
        }
        TaxGroupSliderService.showGeneralErrorNotify(error.message);
        return null;
    };

    static editTaxGroup = async (props: {
        name: string;
        id: string;
        bracket: string[];
    }): Promise<ITaxGroupData> => {
        const { name, id, bracket } = props;
        const { data, status, error } = await requests.catalogue.taxSettingsRequest.editTaxGroup({
            name,
            id,
            bracket,
        });
        if (status) {
            return data;
        }
        TaxGroupSliderService.showGeneralErrorNotify(error.message);
        return null;
    };
}
