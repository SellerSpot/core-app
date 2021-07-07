import { State } from '@hookstate/core';
import { useConfirmDialog } from 'components/Compounds/ConfirmDialog/ConfirmDialog';
import { TaxBracketSlider } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import React, { ReactElement } from 'react';

interface ITaxBracketSliderBaseProps {
    sliderState: State<Pick<ITaxBracketSliderProps, 'showModal' | 'prefillData' | 'mode'>>;
}

export const TaxBracketSliderBase = (props: ITaxBracketSliderBaseProps): ReactElement => {
    // props
    const { sliderState } = props;

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
                sliderState.showModal.set(false);
            }
        } else {
            sliderState.showModal.set(false);
        }
    };
    const onSubmitHandler: ITaxBracketSliderProps['onSubmit'] = async () => {
        console.log('OnSubmit called');
    };

    //compile data
    const taxBracketSliderProps: ITaxBracketSliderProps = {
        level: 1,
        mode: sliderState.mode.get(),
        onClose: onCloseHandler,
        onSubmit: onSubmitHandler,
        showModal: sliderState.showModal.get(),
        prefillData: sliderState.prefillData.get(),
    };

    // draw
    return <TaxBracketSlider {...taxBracketSliderProps} />;
};
