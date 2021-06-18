import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import * as yup from 'yup';
import {
    IBrandData,
    ICreateBrandRequest,
    IEditBrandRequest,
} from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import { IBrandSliderForm } from './BrandSlider.types';

export class BrandSliderService {
    private static validationSchema: yup.SchemaOf<IBrandSliderForm> = yup.object({
        name: yup.string().required('Brand name is required'),
    });

    private static showGeneralErrorNotify = (message: string) => {
        showNotify(message, {
            autoHideDuration: 300,
            showNotifyAction: true,
        });
    };

    static validateField =
        (fieldName: keyof IBrandSliderForm) =>
        (values: IBrandSliderForm['name']): string => {
            const requiredSchema: yup.SchemaOf<IBrandSliderForm['name']> = yup.reach(
                BrandSliderService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
                BrandSliderService.showGeneralErrorNotify(e?.message);
            }
        };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<IBrandSliderForm['name']>,
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

    static createNewBrand = async (values: IBrandSliderForm): Promise<IBrandData> => {
        const { name } = values;
        const requestData: ICreateBrandRequest = {
            name,
        };
        const { data, status, error } = await requests.catalogue.brandRequest.createNewBrand(
            requestData,
        );
        if (status) {
            return data;
        }
        BrandSliderService.showGeneralErrorNotify(error.message);
        return null;
    };

    static editBrand = async (props: { name: string; id: string }): Promise<IBrandData> => {
        const { name, id } = props;
        const requestData: IEditBrandRequest = {
            name,
            id,
        };
        const { data, status, error } = await requests.catalogue.brandRequest.editBrand(
            requestData,
        );
        if (status) {
            return data;
        }
        BrandSliderService.showGeneralErrorNotify(error.message);
        return null;
    };
}
