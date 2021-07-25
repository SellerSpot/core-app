import { State } from '@hookstate/core';
import {
    ICreatableSelectProps,
    IInputFieldProps,
    ISelectOption,
} from '@sellerspot/universal-components';
import {
    ICreateTaxGroupRequest,
    ITaxBracketData,
    ITaxGroupData,
} from '@sellerspot/universal-types';
import { accessConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { IConfirmDialogProps } from 'components/Compounds/ConfirmDialog/ConfirmDialog.types';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import * as yup from 'yup';
import {
    IHandleOnCloseTaxBracketSliderModalProps,
    TaxBracketSliderService,
} from '../TaxBracketSlider/TaxBracketSlider.service';
import {
    ITaxGroupSliderForm,
    ITaxGroupSliderModalDynamicValues,
    ITaxGroupSliderModalOnClose,
    ITaxGroupSliderProps,
} from './TaxGroupSlider.types';

type TGetDynamicProps = Pick<ITaxGroupSliderProps, 'level' | 'mode' | 'prefillData'> & {
    width: string | number;
};
export interface IHandleOnCloseTaxGroupSliderModalProps {
    onCloseProps: ITaxGroupSliderModalOnClose;
    sliderState: {
        showModal: State<ITaxGroupSliderProps['showModal']>;
    };
    taxBracketSlider: IHandleOnCloseTaxBracketSliderModalProps;
}

export class TaxGroupSliderService {
    static convertTaxBracketDataToISelectOption = (
        brackets: ITaxBracketData[],
    ): ISelectOption[] => {
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
                bracket: TaxGroupSliderService.convertTaxBracketDataToISelectOption(
                    prefillData?.bracket,
                ),
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

    private static ISelectOptionValidationSchema: yup.SchemaOf<Omit<ISelectOption, 'key'>> =
        yup.object({
            label: yup.string(),
            value: yup.string(),
        });

    private static validationSchema: yup.SchemaOf<ITaxGroupSliderForm> = yup.object({
        name: yup.string().required('Tax Group name is required'),
        bracket: yup
            .array()
            .of(TaxGroupSliderService.ISelectOptionValidationSchema)
            .min(1, 'Please choose atleast one tax bracket for the tax group')
            .required('Please select the tax brackets for this tax group'),
    });

    static validateField =
        (fieldName: keyof ITaxGroupSliderForm) =>
        (values: ITaxGroupSliderForm[typeof fieldName]): string => {
            const requiredSchema: yup.SchemaOf<ITaxGroupSliderForm[typeof fieldName]> = yup.reach(
                TaxGroupSliderService.validationSchema,
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
        const { error, submitError, touched } = meta;
        let { enabled, content, type }: IInputFieldProps['helperMessage'] = {
            enabled: false,
            content: 'No Content',
            type: 'success',
        };
        let theme: IInputFieldProps['theme'] = 'primary';

        // compute
        if ((error || submitError) && touched) {
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
        const { name, bracket } = values;
        const requestData: ICreateTaxGroupRequest = {
            name,
            bracket: bracket.map((bracket) => bracket.value),
        };
        const { data, status } = await requests.catalogue.taxSettingsRequest.createNewTaxGroup(
            requestData,
        );
        if (status) {
            return data;
        }
        return null;
    };

    static editTaxGroup = async (props: {
        name: string;
        id: string;
        bracket: string[];
    }): Promise<ITaxGroupData> => {
        const { name, id, bracket } = props;
        const { data, status } = await requests.catalogue.taxSettingsRequest.editTaxGroup({
            name,
            id,
            bracket,
        });
        if (status) {
            return data;
        }
        return null;
    };

    static handleOnCloseTaxGroupSliderModal = async (
        props: IHandleOnCloseTaxGroupSliderModalProps,
    ): Promise<void> => {
        // props
        const { onCloseProps, sliderState, taxBracketSlider } = props;
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
            if (taxBracketSlider.sliderState.showModal.get()) {
                await TaxBracketSliderService.handleOnCloseTaxBracketSliderModal(taxBracketSlider);
            } else {
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
        }
    };
}
