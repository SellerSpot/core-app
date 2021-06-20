import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { ICreateTaxBracketRequest, ITaxBracketData } from '@sellerspot/universal-types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import * as yup from 'yup';
import { ITaxBracketSliderForm } from './TaxBracketSlider.types';

export class TaxBracketSliderService {
    static validationSchema: yup.SchemaOf<ITaxBracketSliderForm> = yup.object({
        name: yup.string().required('Bracket name is required'),
        rate: yup
            .number()
            .required('Bracket rate is required')
            .min(0, 'Bracket rate cannot be below 0')
            .max(100, 'Bracket rate cannot be above 100'),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        <T extends keyof ITaxBracketSliderForm>(fieldName: T) =>
        (values: ITaxBracketSliderForm[keyof ITaxBracketSliderForm]): string => {
            const requiredSchema: yup.SchemaOf<ITaxBracketSliderForm[T]> = yup.reach(
                TaxBracketSliderService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
                TaxBracketSliderService.showGeneralErrorNotify(e?.message);
            }
        };

    static validateForm = (values: ITaxBracketSliderForm): string => {
        try {
            TaxBracketSliderService.validationSchema.validateSync(values);
            return null;
        } catch (e) {
            if (e instanceof yup.ValidationError) {
                return e.message;
            }
        }
    };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<ITaxBracketSliderForm[keyof ITaxBracketSliderForm]>,
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

    static createNewTaxBracket = async (
        values: ITaxBracketSliderForm,
    ): Promise<ITaxBracketData> => {
        const { name, rate } = values;
        const requestData: ICreateTaxBracketRequest = {
            name,
            rate: +rate,
        };
        const { data, status, error } =
            await requests.catalogue.taxBracketRequest.createNewTaxBracket(requestData);
        if (status) {
            return data;
        }

        TaxBracketSliderService.showGeneralErrorNotify(error.message);
        return null;
    };

    static editTaxBracket = async (props: {
        name: string;
        rate: number;
        id: string;
    }): Promise<ITaxBracketData> => {
        const { name, id, rate } = props;
        const { data, status, error } = await requests.catalogue.taxBracketRequest.editTaxBracket({
            name,
            rate,
            id,
        });
        if (status) {
            return data;
        }
        TaxBracketSliderService.showGeneralErrorNotify(error.message);
        return null;
    };
}
