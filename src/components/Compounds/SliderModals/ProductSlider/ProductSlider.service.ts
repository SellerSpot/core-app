import { State } from '@hookstate/core';
import { IInputFieldProps } from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    IProductSliderForm,
    IProductSliderModalDynamicValues,
    IProductSliderModalOnClose,
    IProductSliderProps,
} from './ProductSlider.types';

type TGetDynamicProps = Pick<IProductSliderProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseProductSliderModalProps {
    onCloseProps: IProductSliderModalOnClose;
    sliderState: {
        showModal: State<IProductSliderProps['showModal']>;
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
        let modalTitle = 'Create new tax bracket';
        let modalFooterPrimaryButtonLabel = 'CREATE TAX BRACKET';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IProductSliderForm = {
            name: '',
            rate: 0,
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
        if (mode === 'edit') modalTitle = 'Edit tax bracket';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // initialFormValues
        initialFormValues = {
            name: prefillData?.name,
            rate: prefillData?.rate,
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
        name: yup.string().required('Bracket name is required'),
        rate: yup
            .number()
            .required('Bracket rate is required')
            .min(0, 'Bracket rate cannot be below 0')
            .max(100, 'Bracket rate cannot be above 100'),
    });

    static validateField =
        <T extends keyof IProductSliderForm>(fieldName: T) =>
        (values: IProductSliderForm[keyof IProductSliderForm]): string => {
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

    static handleOnCloseProductSliderModal = async (
        props: IHandleOnCloseProductSliderModalProps,
    ): Promise<void> => {
        // props
        const { onCloseProps, sliderState } = props;
        const { dirty, event, submitting } = onCloseProps;

        // confirm dialog actions
        const { closeDialog, confirm } = accessConfirmDialog();

        // stop propagation
        event?.stopPropagation();
        event?.preventDefault();

        // compile data
        const dialogProps: IConfirmDialogProps = {
            title: 'Are you sure?',
            content: 'You will lose all data entered for the tax bracket',
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
                    sliderState.showModal.set(false);
                }
            } else {
                sliderState.showModal.set(false);
            }
        }
    };
}
