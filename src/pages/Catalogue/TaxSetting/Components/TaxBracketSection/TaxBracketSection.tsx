import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader.stories';
import { ITaxBracketSliderProps } from 'components/Compounds/SliderModals/TaxBracketSlider/TaxBracketSlider.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxBracketSliderBase } from './Components/TaxBracketSliderBase/TaxBracketSliderBase';
import { TaxBracketTable } from './Components/TaxBracketTable/TaxBracketTable';
import styles from './TaxBracketSection.module.scss';

interface ITaxBracketSection {
    pageState: State<ITaxSettingPageState>;
}

interface IComponentState {
    taxBracketSlider: Pick<ITaxBracketSliderProps, 'showModal' | 'prefillData' | 'mode'>;
}

interface IPageHeaderComponentProps {
    sliderState: State<IComponentState['taxBracketSlider']>;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { sliderState } = props;
    // components
    const NewTaxBracketButton = () => {
        // handlers
        const handleOnClick = async () => {
            sliderState.merge({
                mode: 'create',
                prefillData: null,
                showModal: true,
            });
        };

        // draw
        return (
            <Button
                label="NEW TAX BRACKET"
                theme="primary"
                variant="contained"
                onClick={handleOnClick}
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };
    // draw
    return (
        <PageHeader
            title="Tax Brackets"
            actions={[<NewTaxBracketButton key="newTaxBracketButton" />]}
        />
    );
};

export const TaxBracketSection = (props: ITaxBracketSection): ReactElement => {
    // props
    const { pageState } = props;

    // state
    // state
    const componentState = useState<IComponentState>({
        taxBracketSlider: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent sliderState={componentState.taxBracketSlider} />
            <TaxBracketTable pageState={pageState} />
            <TaxBracketSliderBase sliderState={componentState.taxBracketSlider} />
        </div>
    );
};
