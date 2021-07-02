import { State } from '@hookstate/core';
import { showNotify } from '@sellerspot/universal-components';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { TaxBracketSlider } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider';
import {
    ITaxBracketSliderForm,
    ITaxBracketSliderProps,
} from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { TaxSettingsService } from 'pages/Catalogue/TaxSettings/TaxSettings.service';
import { ITaxSettingsState } from 'pages/Catalogue/TaxSettings/TaxSettings.types';
import React, { ReactElement } from 'react';

interface ITaxBracketSliderBaseProps {
    sliderState: State<ITaxSettingsState['taxBracketSlider']>;
    getAllTaxBracket: () => Promise<void>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sliderState, getAllTaxBracket } = props;

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const onCloseHandler: ITaxBracketSliderProps['onClose'] = async (props) => {
        // props
        const { dirty, submitting } = props;

        // compute
        if (!dirty && !submitting) {
            sliderState.showModal.set(false);
        } else if (dirty) {
            confirmDialog
                .confirm({
                    title: 'Are you sure?',
                    content: 'All entered form data will be lost if the modal is closed',
                    theme: 'warning',
                    primaryButtonProps: {
                        label: 'KEEP OPEN',
                    },
                    secondaryButtonProps: {
                        label: 'CLOSE MODAL',
                    },
                    dialogCloseCallback: () => void 0,
                })
                .catch(() => {
                    sliderState.showModal.set(false);
                });
        }
    };
    const createNewTaxBracket = async (values: ITaxBracketSliderForm) => {
        const newTaxBracketData = await TaxSettingsService.createNewTaxBracket(values);
        // if new TaxBracket has been created, update
        if (!!newTaxBracketData) {
            // calling notify
            showNotify(`'${newTaxBracketData.name}' tax bracket created successfully!`, {
                theme: 'success',
            });
            await getAllTaxBracket();
            // closing sliderModal
            sliderState.showModal.set(false);
        }
    };
    const editExistingTaxBracket = async (values: ITaxBracketSliderForm) => {
        // props
        const { name, rate } = values;
        // request
        const editedTaxBracketData = await TaxSettingsService.editTaxBracket({
            id: sliderState.prefillData.get().id,
            name,
            rate,
        });
        // if TaxBracket has been edited
        if (!!editedTaxBracketData) {
            // calling notify
            showNotify(`'${editedTaxBracketData.name}' tax bracket edited successfully!`, {
                theme: 'success',
            });
            await getAllTaxBracket();
            // closing sliderModal
            sliderState.showModal.set(false);
        }
    };
    const onSubmitHandler: ITaxBracketSliderProps['onSubmit'] = async ({ values }) => {
        if (sliderState.mode.get() === 'edit') {
            await editExistingTaxBracket(values);
        } else {
            await createNewTaxBracket(values);
        }
    };

    // data compile
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        level: 1,
        mode: sliderState.mode.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        prefillData: sliderState.prefillData.get(),
        showModal: sliderState.showModal.get(),
    };

    // draw
    return <TaxBracketSlider {...taxBracketSliderProps} />;
};
