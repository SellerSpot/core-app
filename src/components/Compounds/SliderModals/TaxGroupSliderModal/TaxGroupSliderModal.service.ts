import { State } from '@hookstate/core';
import {
    ICreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import { ITaxBracketData, ITaxGroupData } from '@sellerspot/universal-types';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import { SelectOptionValidationSchema, showErrorHelperMessage } from 'utilities/general';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    IHandleOnCloseTaxBracketSliderModalProps,
    TaxBracketSliderModalService,
} from '../TaxBracketSliderModal/TaxBracketSliderModal.service';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderModalDynamicValues,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderModalProps,
} from './TaxGroupSliderModal.types';

type TGetDynamicProps = Pick<ITaxGroupSliderModalProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseTaxGroupSliderModalProps {
    onCloseProps: ITaxGroupSliderModalOnClose;
    sliderModalState: {
        showModal: State<ITaxGroupSliderModalProps['showModal']>;
    };
    taxBracketSliderModal: IHandleOnCloseTaxBracketSliderModalProps;
}

interface IConvertTaxBracketDataToISelectOptionProps {
    brackets: ITaxBracketData[];
}

interface IEditTaxBracketProps {
    name: string;
    id: string;
    bracket: string[];
}

export class TaxGroupSliderModalService {
    static convertTaxBracketDataToISelectOption = (
        props: IConvertTaxBracketDataToISelectOptionProps,
    ): ISelectOption[] => {
        // props
        const { brackets } = props;

        return brackets.map((bracket) => {
            // props
            const { name, rate, id } = bracket;
            // return
            return {
                label: `${name} - ${rate}%`,
                value: id,
            };
        });
    };

    static getDynamicProps = (props: TGetDynamicProps): ITaxGroupSliderModalDynamicValues => {
        // props
        const { level, width, mode, prefillData } = props;
        const sliderModalProps: ITaxGroupSliderModalDynamicValues['sliderModalProps'] = {
            showBackdrop: true,
            width: width,
            type: 'fixed',
        };
        let closeButtonType: ITaxGroupSliderModalDynamicValues['closeButtonType'] = 'close';
        let modalTitle = 'Create new tax Group';
        let modalFooterPrimaryButtonLabel = 'CREATE TAX GROUP';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;
        let initialFormValues: ITaxGroupSliderForm = {
            name: '',
            bracket: [],
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
        if (mode === 'edit') modalTitle = 'Edit tax group';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // initialFormValues
        if (mode === 'edit') {
            initialFormValues = {
                name: prefillData?.name,
                bracket: TaxGroupSliderModalService.convertTaxBracketDataToISelectOption({
                    brackets: prefillData?.bracket as ITaxBracketData[],
                }),
            };
        }

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

    private static validationSchema: yup.SchemaOf<ITaxGroupSliderForm> = yup.object({
        name: yup.string().required('Tax Group name is required'),
        bracket: yup
            .array()
            .of(SelectOptionValidationSchema)
            .min(1, 'Please choose atleast one tax bracket for the tax group')
            .required('Please select the tax brackets for this tax group'),
    });

    static validateField =
        (fieldName: keyof ITaxGroupSliderForm) =>
        (values: ITaxGroupSliderForm[typeof fieldName]): string => {
            const requiredSchema: yup.SchemaOf<ITaxGroupSliderForm[typeof fieldName]> = yup.reach(
                TaxGroupSliderModalService.validationSchema,
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
        meta: FieldMetaState<ITaxGroupSliderForm>,
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
        meta: FieldMetaState<ITaxGroupSliderForm>,
    ): ICreatableSelectProps['helperMessage'] => {
        // props
        const { error, submitError, touched } = meta;
        let { enabled, content, type }: ICreatableSelectProps['helperMessage'] = {
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
        // props
        const { name, bracket } = values;

        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxGroup({
            name,
            bracket: bracket.map((bracket) => bracket.value),
        });

        // actions
        if (status) {
            return data;
        }
        return null;
    };

    static edi̥tTaxGroup = async (props: IEditTaxBracketProps): Promise<ITaxGroupData> => {
        // props
        const { name, id, bracket } = props;

        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxGroup(id, {
            name,
            bracket,
        });

        // actions
        if (status) {
            return data;
        }
        return null;
    };

    static handleOnCloseTaxGroupSliderModal = async (
        props: IHandleOnCloseTaxGroupSliderModalProps,
    ): Promise<void> => {
        // props
        const { onCloseProps, sliderModalState, taxBracketSliderModal } = props;
        const { dirty, event, submitting } = onCloseProps;

        // confirm dialog actions
        const { closeDialog, confirm } = accessConfirmDialog();

        // stop propagation
        event?.stopPropagation();
        event?.preventDefault();

        // compile data
        const dialogProps: IConfirmDialogProps = {
            title: 'Are you sure?',
            content: 'You will lose all data entered for the tax group',
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
            if (taxBracketSliderModal.sliderModalState.showModal.get()) {
                await TaxBracketSliderModalService.handleOnCloseTaxBracketSliderModal(
                    taxBracketSliderModal,
                );
            } else {
                if (dirty) {
                    const confirmResult = await confirm(dialogProps);
                    closeDialog();
                    if (confirmResult) {
                        sliderModalState && sliderModalState.showModal.set(false);
                    }
                } else {
                    sliderModalState && sliderModalState.showModal.set(false);
                }
            }
        }
    };

    static createTaxGroup = async (values: ITaxGroupSliderForm): Promise<ITaxGroupData> => {
        // props
        const { bracket, name } = values;
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxGroup({
            name: name,
            bracket: bracket.map((bracket) => bracket.value),
        });
        if (status) {
            return data;
        }
        return null;
    };

    static editTaxGroup = async (
        values: ITaxGroupSliderForm & { id: string },
    ): Promise<ITaxGroupData> => {
        // request
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxGroup(
            values.id,
            {
                name: values.name,
                bracket: values.bracket.map((bracket) => bracket.value),
            },
        );
        if (status) {
            return data;
        }
        return null;
    };
}
