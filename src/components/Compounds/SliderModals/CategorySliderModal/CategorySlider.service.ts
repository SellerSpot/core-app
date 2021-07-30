import { State } from '@hookstate/core';
import { IInputFieldProps } from '@sellerspot/universal-components';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    ICategorySliderForm,
    ICategorySliderModalDynamicValues,
    ICategorySliderModalOnClose,
    ICategorySliderModalProps,
} from './CategorySlider.types';

type TGetDynamicProps = Pick<ICategorySliderModalProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseCategorySliderModalProps {
    onCloseProps: ICategorySliderModalOnClose;
    sliderModalState: {
        showModal: State<ICategorySliderModalProps['showModal']>;
    };
}
export class CategorySliderService {
    static getDynamicProps = (props: TGetDynamicProps): ICategorySliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalProps: ICategorySliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width: width,
            type: 'fixed',
        };
        let closeButtonType: ICategorySliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new category';
        let modalFooterPrimaryButtonLabel = 'CREATE CATAGORY';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: ICategorySliderForm = {
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
        if (mode === 'edit') modalTitle = 'Edit category';

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

    static validationSchema = (siblingNames: string[]): yup.SchemaOf<ICategorySliderForm> =>
        yup.object({
            name: yup
                .string()
                .required('Category name is required')
                .test({
                    test: (value) => !siblingNames.includes(value.toLocaleLowerCase()),
                    message: 'Category already exists at current level',
                }),
        });

    static validateField =
        <T extends keyof ICategorySliderForm>(fieldName: T, siblingNames: string[]) =>
        (values: ICategorySliderForm[keyof ICategorySliderForm]): string => {
            const requiredSchema: yup.SchemaOf<ICategorySliderForm[T]> = yup.reach(
                CategorySliderService.validationSchema(siblingNames),
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
        meta: FieldMetaState<ICategorySliderForm[keyof ICategorySliderForm]>,
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

    static handleOnCloseCategorySliderModal = async (
        props: IHandleOnCloseCategorySliderModalProps,
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
            content: 'You will lose all data entered for the category',
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
