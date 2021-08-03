import { State } from '@hookstate/core';
import { IconifyIcon } from '@iconify/react';
import {
    IAsyncCreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
    ISliderModalProps,
} from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import { SelectOptionValidationSchema, showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import { IProductData } from '../../../../../.yalc/@sellerspot/universal-types/dist';
import {
    IProductSliderModalForm,
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

export interface IProductSliderModalDynamicValues {
    sliderModalProps: Pick<ISliderModalProps, 'width' | 'type' | 'showBackdrop'>;
    closeButtonType: 'back' | 'close';
    modalTitle: string;
    modalFooterPrimaryButtonLabel: string;
    modalFooterPrimaryButtonIcon: IconifyIcon['icon'];
    initialFormValues: IProductSliderModalForm;
}

export class ProductSliderModalService {
    static getDynamicProps = (props: TGetDynamicProps): IProductSliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalDynamicProps: IProductSliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width,
            type: 'fixed',
        };
        let closeButtonType: IProductSliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new product';
        let modalFooterPrimaryButtonLabel = 'CREATE PRODUCT';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IProductSliderModalForm = {
            name: '',
            barcode: '',
            description: '',
            brand: null,
            category: '',
            stockUnit: null,
        };

        // sliderModalProps
        if (level === 2) {
            sliderModalDynamicProps.width = '100%';
            sliderModalDynamicProps.showBackdrop = false;
            sliderModalDynamicProps.type = 'absolute';
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
        if (prefillData) {
            initialFormValues = {
                ...prefillData,
            };
        }

        // return
        return {
            sliderModalProps: sliderModalDynamicProps,
            closeButtonType,
            modalTitle,
            modalFooterPrimaryButtonLabel,
            modalFooterPrimaryButtonIcon,
            initialFormValues,
        };
    };

    static validationSchema: yup.SchemaOf<IProductSliderModalForm> = yup.object({
        name: yup.string().required('Product name is required'),
        barcode: yup.string(),
        description: yup.string(),
        brand: SelectOptionValidationSchema,
        category: yup.string(),
        stockUnit: SelectOptionValidationSchema,
    });

    static validateField =
        <T extends keyof IProductSliderModalForm>(fieldName: T) =>
        (
            values: IProductSliderModalForm[keyof IProductSliderModalForm],
        ): string | ISelectOption => {
            const requiredSchema: yup.SchemaOf<IProductSliderModalForm[T]> = yup.reach(
                ProductSliderModalService.validationSchema,
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
        meta: FieldMetaState<IProductSliderModalForm[keyof IProductSliderModalForm]>,
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
        meta: FieldMetaState<IProductSliderModalForm>,
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

    // requests
    static createNewProduct = async (values: IProductSliderModalForm): Promise<IProductData> => {
        // props
        const { name, barcode, brand, category, description, stockUnit } = values;
        // request
        const { data, status } = await requests.catalogue.productRequest.createNewProduct({
            name,
            barcode,
            description,
            category,
            brand: brand?.value,
            stockUnit: stockUnit?.value,
        });
        if (status) {
            return data;
        }
        return null;
    };

    static editProduct = async (
        props: IProductSliderModalForm & { id: string },
    ): Promise<IProductData> => {
        // props
        const { name, barcode, brand, category, description, stockUnit, id } = props;
        // request
        const { data, status } = await requests.catalogue.productRequest.editProduct(id, {
            name,
            barcode,
            description,
            category,
            brand: brand?.value,
            stockUnit: stockUnit?.value,
        });
        if (status) {
            return data;
        }
        return null;
    };
}
