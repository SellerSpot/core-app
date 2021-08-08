import { State } from '@hookstate/core';
import { IInputFieldProps } from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import { showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import { IStockUnitData } from '@sellerspot/universal-types';
import {
    IStockUnitSliderForm,
    IStockUnitSliderModalDynamicValues,
    IStockUnitSliderModalOnClose,
    IStockUnitSliderModalProps,
} from './StockUnitSliderModal.types';

type TGetDynamicProps = Pick<IStockUnitSliderModalProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseStockUnitSliderModalProps {
    onCloseProps: IStockUnitSliderModalOnClose;
    sliderModalState: {
        showModal: State<IStockUnitSliderModalProps['showModal']>;
    };
}

type ICreateNewStockUnitProps = IStockUnitSliderForm;

type IEditStockUnitProps = Pick<IStockUnitData, 'id' | 'name' | 'unit'>;

export class StockUnitSliderModalService {
    static getDynamicProps = (props: TGetDynamicProps): IStockUnitSliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalProps: IStockUnitSliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width: width,
            type: 'fixed',
        };
        let closeButtonType: IStockUnitSliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new stock unit';
        let modalFooterPrimaryButtonLabel = 'CREATE STOCK UNIT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IStockUnitSliderForm = {
            name: '',
            unit: '',
        };

        if (level === 2) {
            // sliderModalProps
            sliderModalProps.width = '100%';
            sliderModalProps.showBackdrop = false;
            sliderModalProps.type = 'absolute';

            closeButtonType = 'back';
            // closeButtonType
        }

        if (mode === 'edit') {
            // modalTitle
            modalTitle = 'Edit stock unit';

            // modalFooterPrimaryButtonLabel
            modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

            // modalFooterPrimaryButtonIcon
            modalFooterPrimaryButtonIcon = ICONS.check;
        }

        // initialFormValues
        initialFormValues = {
            name: prefillData?.name,
            unit: prefillData?.unit,
        };

        // return
        return {
            sliderModalProps,
            closeButtonType,
            modalTitle,
            modalFooterPrimaryButtonLabel,
            modalFooterPrimaryButtonIcon,
            initialFormValues,
        };
    };

    static validationSchema: yup.SchemaOf<IStockUnitSliderForm> = yup.object({
        name: yup.string().required('Name is required'),
        unit: yup.string().required('Unit is required'),
    });

    static validateField =
        <T extends keyof IStockUnitSliderForm>(fieldName: T) =>
        (values: IStockUnitSliderForm[keyof IStockUnitSliderForm]): string => {
            const requiredSchema: yup.SchemaOf<IStockUnitSliderForm[T]> = yup.reach(
                StockUnitSliderModalService.validationSchema,
                fieldName,
            );
            try {
                requiredSchema.validateSync(values);
            } catch (e) {
                if (e instanceof yup.ValidationError) {
                    return e.message;
                }
            }
        };

    static getSpecialInputFieldProps = (
        meta: FieldMetaState<IStockUnitSliderForm[keyof IStockUnitSliderForm]>,
    ): IInputFieldProps['helperMessage'] & {
        theme: IInputFieldProps['theme'];
    } => {
        // props
        const { error, submitError } = meta;
        let { enabled, content, type }: IInputFieldProps['helperMessage'] = {
            enabled: false,
            content: 'No Content',
            type: 'success',
        };
        let theme: IInputFieldProps['theme'] = 'primary';

        // compute
        if (showErrorHelperMessage(meta)) {
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

    static handleOnCloseStockUnitSliderModal = async (
        props: IHandleOnCloseStockUnitSliderModalProps,
    ): Promise<void> => {
        // props
        const { onCloseProps, sliderModalState } = props;
        const { dirty, event, submitting } = onCloseProps;

        // confirm dialog actions
        const { closeDialog, confirm } = accessConfirmDialog();

        // stop propagation
        event?.stopPropagation();
        event?.preventDefault();

        // compile data
        const dialogProps: IConfirmDialogProps = {
            title: 'Are you sure?',
            content: 'You will lose all data entered for the stock unit',
            theme: 'warning',
            primaryButtonProps: {
                label: 'CLOSE',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'CANCEL',
                theme: 'primary',
            },
        };

        // logic
        if (!submitting) {
            if (dirty) {
                const confirmResult = await confirm(dialogProps);
                closeDialog();
                if (confirmResult) {
                    sliderModalState.showModal.set(false);
                }
            } else {
                sliderModalState.showModal.set(false);
            }
        }
    };

    // requests
    static createNewStockUnit = async (
        props: ICreateNewStockUnitProps,
    ): Promise<IStockUnitData> => {
        // props
        const { name, unit } = props;
        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.createNewStockUnit({
            name,
            unit,
        });
        if (status) {
            return data;
        }
        return null;
    };

    static editStockUnit = async (props: IEditStockUnitProps): Promise<IStockUnitData> => {
        // props
        const { name, id, unit } = props;
        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.editStockUnit(id, {
            name,
            unit,
        });
        if (status) {
            return data;
        }
        return null;
    };
}
