import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { ICreateStockUnitRequest, IStockUnitData } from '@sellerspot/universal-types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import * as yup from 'yup';
import { IStockUnitSliderForm } from './StockUnitSlider.types';

export class StockUnitSliderService {
    private static validationSchema: yup.SchemaOf<IStockUnitSliderForm> = yup.object({
        name: yup.string().required('StockUnit name is required'),
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

    static createNewStockUnit = async (values: IStockUnitSliderForm): Promise<IStockUnitData> => {
        const { name } = values;
        const requestData: ICreateStockUnitRequest = {
            name,
        };
        const { data, status, error } =
            await requests.catalogue.stockUnitRequest.createNewStockUnit(requestData);
        if (status) {
            return data;
        }
        StockUnitSliderService.showGeneralErrorNotify(error.message);
        return null;
    };

    static editStockUnit = async (props: { name: string; id: string }): Promise<IStockUnitData> => {
        const { name, id } = props;
        const { data, status, error } = await requests.catalogue.stockUnitRequest.editStockUnit({
            name,
            id,
        });
        if (status) {
            return data;
        }
        StockUnitSliderService.showGeneralErrorNotify(error.message);
        return null;
    };
}
