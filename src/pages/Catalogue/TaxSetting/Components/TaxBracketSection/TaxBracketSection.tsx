import { State } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader.stories';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxBracketSliderBase } from './Components/TaxBracketSliderBase/TaxBracketSliderBase';
import { TaxBracketTable } from './Components/TaxBracketTable/TaxBracketTable';
import styles from './TaxBracketSection.module.scss';
import { TaxBracketSectionService } from './TaxBracketSection.service';

interface ITaxBracketSection {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
}

interface IPageHeaderComponentProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { sectionState } = props;

    // handlers
    const getAllTaxBrackets = async () => {
        sectionState.isTableLoading.set(true);
        const allTaxBrackets = await TaxBracketSectionService.getAllTaxBracket();
        sectionState.allTaxBrackets.set(allTaxBrackets);
        sectionState.isTableLoading.set(false);
    };

    // effects
    useEffect(() => {
        getAllTaxBrackets();
    }, []);

    // components
    const NewTaxBracketButton = () => {
        // handlers
        const handleOnClick = async () => {
            sectionState.sliderModal.merge({
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
    const { sectionState } = props;

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent sectionState={sectionState} />
            <TaxBracketTable sectionState={sectionState} />
            <TaxBracketSliderBase sectionState={sectionState} />
        </div>
    );
};
