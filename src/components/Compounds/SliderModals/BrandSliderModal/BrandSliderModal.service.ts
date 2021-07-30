import { State } from '@hookstate/core';
import { IInputFieldProps } from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    IBrandSliderForm,
    IBrandSliderModalDynamicValues,
    IBrandSliderModalOnClose,
    IBrandSliderModalProps,
} from './BrandSliderModal.types';

type TGetDynamicProps = Pick<IBrandSliderModalProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseBrandSliderModalProps {
    onCloseProps: IBrandSliderModalOnClose;
    sliderModalState: {
        showModal: State<IBrandSliderModalProps['showModal']>;
    };
}
export class BrandSliderService {
    static getDynamicProps = (props: TGetDynamicProps): IBrandSliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalProps: IBrandSliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width: width,
            type: 'fixed',
        };
        let closeButtonType: IBrandSliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new brand';
        let modalFooterPrimaryButtonLabel = 'CREATE BRAND';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: IBrandSliderForm = {
            name: '',
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
        if (mode === 'edit') modalTitle = 'Edit brand';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // initialFormValues
        initialFormValues = {
            name: prefillData?.name,
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

    static validationSchema: yup.SchemaOf<IBrandSliderForm> = yup.object({
        name: yup.string().required('Brand name is required'),
    });

    static validateField =
        <T extends keyof IBrandSliderForm>(fieldName: T) =>
        (values: IBrandSliderForm[keyof IBrandSliderForm]): string => {
            const requiredSchema: yup.SchemaOf<IBrandSliderForm[T]> = yup.reach(
                BrandSliderService.validationSchema,
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
        meta: FieldMetaState<IBrandSliderForm[keyof IBrandSliderForm]>,
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

    static handleOnCloseBrandSliderModal = async (
        props: IHandleOnCloseBrandSliderModalProps,
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
            content: 'You will lose all data entered for the brand',
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
