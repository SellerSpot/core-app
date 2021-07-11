import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader.stories';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxBracketData } from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxBracketSliderBase } from './Components/TaxBracketSliderBase/TaxBracketSliderBase';
import { TaxBracketTable } from './Components/TaxBracketTable/TaxBracketTable';
import styles from './TaxBracketSection.module.scss';

interface ITaxBracketSectionProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
    getAllTaxBrackets: () => Promise<void>;
    allTaxBrackets: ITaxBracketData[];
}

interface IPageHeaderComponentProps {
    sectionState: State<ITaxSettingPageState['taxBracketSection']>;
    getAllTaxBrackets: () => Promise<void>;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { sectionState, getAllTaxBrackets } = props;

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

export const TaxBracketSection = (props: ITaxBracketSectionProps): ReactElement => {
    // props
    const { sectionState: sectionStateOriginal, getAllTaxBrackets, allTaxBrackets } = props;

    // state
    const sectionState = useState(sectionStateOriginal);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent
                sectionState={sectionState}
                getAllTaxBrackets={getAllTaxBrackets}
            />
            <TaxBracketTable
                sectionState={sectionState}
                getAllTaxBrackets={getAllTaxBrackets}
                allTaxBrackets={allTaxBrackets}
            />
            <TaxBracketSliderBase
                sectionState={sectionState}
                getAllTaxBrackets={getAllTaxBrackets}
            />
        </div>
    );
};
