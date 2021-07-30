import { State } from '@hookstate/core';
import {
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { SelectOptionValidationSchema, showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    IProductSliderForm,
    IProductSliderModalDynamicValues,
    IProductSliderModalOnClose,
    IProductSliderModalProps,
} from './ProductSliderModal.types';

type TGetDynamicProps = Pick<IProductSliderModalProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseProductSliderModalProps {
    onCloseProps: IProductSliderModalOnClose;
    sliderModalState: {
        showModal: State<IProductSliderModalProps['showModal']>;
    };
}
export class ProductSliderService {
    static getDynamicProps = (props: TGetDynamicProps): IProductSliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalProps: IProductSliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width: width,
            type: 'fixed',
        };
        let closeButtonType: IProductSliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new product';
        let modalFooterPrimaryButtonLabel = 'CREATE PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IProductSliderForm = {
            name: '',
            barcode: '',
            description: '',
            brand: null,
            category: '',
            stockUnit: null,
        };

        // sliderModalProps
        if (level === 2) {
            sliderModalProps.width = '100%';
            sliderModalProps.showBackdrop = false;
            sliderModalProps.type = 'absolute';
        }

        // closeButtonType
        if (level === 2) {
            closeButtonType = 'back';
        }

        // modalTitle
        if (mode === 'edit') modalTitle = 'Edit product';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // initialFormValues
        initialFormValues = {
            ...prefillData,
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

    static validationSchema: yup.SchemaOf<IProductSliderForm> = yup.object({
        name: yup.string().required('Product name is required'),
        barcode: yup.string(),
        description: yup.string(),
        brand: SelectOptionValidationSchema,
        category: yup.string(),
        stockUnit: SelectOptionValidationSchema,
    });

    static validateField =
        <T extends keyof IProductSliderForm>(fieldName: T) =>
        (values: IProductSliderForm[keyof IProductSliderForm]): string | ISelectOption => {
            const requiredSchema: yup.SchemaOf<IProductSliderForm[T]> = yup.reach(
                ProductSliderService.validationSchema,
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
        meta: FieldMetaState<IProductSliderForm[keyof IProductSliderForm]>,
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

    static getSpecialSelectFieldProps = (
        meta: FieldMetaState<IProductSliderForm>,
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

    static handleOnCloseProductSliderModal = async (
        props: IHandleOnCloseProductSliderModalProps,
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
            content: 'You will lose all data entered for the product',
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
}
