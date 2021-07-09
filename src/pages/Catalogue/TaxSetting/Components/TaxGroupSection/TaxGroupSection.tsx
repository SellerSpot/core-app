import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxGroupSliderBase } from './Components/TaxGroupSliderBase/TaxGroupSliderBase';
import { TaxGroupTable } from './Components/TaxGroupTable/TaxGroupTable';
import styles from './TaxGroupSection.module.scss';

interface ITaxGroupSectionProps {
    allTaxBrackets: ITaxSettingPageState['allTaxBrackets'];
}

interface IComponentState {
    taxGroupSlider: Pick<ITaxGroupSliderProps, 'showModal' | 'prefillData' | 'mode'>;
}

interface IPageHeaderComponentProps {
    taxGroupSlider: State<Pick<ITaxGroupSliderProps, 'showModal' | 'prefillData' | 'mode'>>;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { taxGroupSlider } = props;

    // components
    const NewTaxBracketButton = () => {
        // handlers
        const handleOnClick = async () => {
            taxGroupSlider.merge({
                mode: 'create',
                prefillData: null,
                showModal: true,
            });
        };

        // draw
        return (
            <Button
                label="NEW TAX GROUP"
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
            title="Tax Groups"
            actions={[<NewTaxBracketButton key="newTaxBracketButton" />]}
        />
    );
};

export const TaxGroupSection = (props: ITaxGroupSectionProps): ReactElement => {
    // props
    const { allTaxBrackets } = props;

    // state
    const componentState = useState<IComponentState>({
        taxGroupSlider: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent taxGroupSlider={componentState.taxGroupSlider} />
            <TaxGroupTable />
            <TaxGroupSliderBase
                allTaxBrackets={allTaxBrackets}
                taxGroupSlider={componentState.taxGroupSlider}
            />
        </div>
    );
};
