import { State, useState } from '@hookstate/core';
import { ITaxGroupData } from '@sellerspot/universal-types';
import React, { ReactElement } from 'react';
import { Button } from '@sellerspot/universal-components';
import Icon from '@iconify/react';
import { ICONS } from 'utilities/utilities';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './TaxGroupSection.module.scss';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxGroupSliderBase } from './Components/TaxGroupSliderBase/TaxGroupSliderBase';
import { ITaxGroupSliderProps } from 'components/Compounds/SliderModals/TaxGroupSlider/TaxGroupSlider.types';
import { TaxGroupTable } from './Components/TaxGroupTable/TaxGroupTable';

interface ITaxGroupSectionProps {
    allBrackets: ITaxSettingPageState['allBrackets'];
}

interface IComponentState {
    allTaxGroups: ITaxGroupData[];
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
    const { allBrackets } = props;

    // state
    const componentState = useState<IComponentState>({
        allTaxGroups: [],
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
                allBrackets={allBrackets}
                taxGroupSlider={componentState.taxGroupSlider}
            />
        </div>
    );
};
