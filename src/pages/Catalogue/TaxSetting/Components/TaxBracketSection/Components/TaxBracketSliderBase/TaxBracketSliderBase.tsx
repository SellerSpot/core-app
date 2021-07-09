import { State } from '@hookstate/core';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { TaxBracketSlider } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import { ITaxSettingPageState } from 'pages/Catalogue/TaxSetting/TaxSetting.types';
import React, { ReactElement } from 'react';
import { TaxBracketSliderBaseService } from './TaxBracketSliderBase.service';

interface ITaxBracketSliderBaseProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sectionState } = props;

    // hooks
    const confirmDialog = useConfirmDialog();

    // handlers
    const onCloseHandler: ITaxBracketSliderProps['onClose'] = async (props) => {
        // props
        const { dirty, submitting } = props;
        // compute
        if (dirty || submitting) {
            const dialogResponse = await confirmDialog.confirm({
                title: 'Are you sure?',
                content: 'All data you entered will be lost',
                theme: 'warning',
            });
            if (dialogResponse) {
                sectionState.sliderModal.showModal.set(false);
            }
        } else {
            sectionState.sliderModal.showModal.set(false);
        }
    };
    const onSubmitHandler: ITaxBracketSliderProps['onSubmit'] = async ({ values }) => {
        await TaxBracketSliderBaseService.createNewTaxBracket(values);
        sectionState.sliderModal.merge({
            showModal: false,
        });
    };

    //compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        level: 1,
        mode: sectionState.sliderModal.mode.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        showModal: sectionState.sliderModal.showModal.get(),
        prefillData: sectionState.sliderModal.prefillData.get(),
    };

    // draw
    return <TaxBracketSlider {...taxBracketSliderProps} />;
};
