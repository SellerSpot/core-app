import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import { ITaxBracketData } from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import { ITaxSettingPageState } from '../../TaxSetting.types';
import { TaxGroupSliderBase } from './Components/TaxGroupSliderBase/TaxGroupSliderBase';
import { TaxGroupTable } from './Components/TaxGroupTable/TaxGroupTable';
import styles from './TaxGroupSection.module.scss';
import { TaxGroupSectionService } from './TaxGroupSection.service';

interface ITaxGroupSectionProps {
    sectionState: State<ITaxSettingPageState['taxGroupSection']>;
    getAllTaxBracket: () => Promise<void>;
    allTaxBrackets: ITaxBracketData[];
}

interface IPageHeaderComponentProps {
    sectionState: State<ITaxSettingPageState['taxGroupSection']>;
}

const PageHeaderComponent = (props: IPageHeaderComponentProps) => {
    // props
    const { sectionState } = props;

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
    const { sectionState: sectionStateOriginal, getAllTaxBracket, allTaxBrackets } = props;

    // state
    const sectionState = useState(sectionStateOriginal);

    // handlers
    const getAllTaxGroups = async () => {
        // request
        const allTaxGroups = await TaxGroupSectionService.getAllTaxGroup();
        // state update
        sectionState.allTaxGroups.set(allTaxGroups);
        sectionState.isTableLoading.set(false);
    };

    // effects
    useEffect(() => {
        getAllTaxGroups();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <PageHeaderComponent sectionState={sectionState} />
            <TaxGroupTable sectionState={sectionState} getAllTaxGroups={getAllTaxGroups} />
            <TaxGroupSliderBase
                taxBracketSliderModalState={sectionState.taxBracketSliderModal}
                taxGroupSliderModalState={sectionState.sliderModal}
                getAllTaxGroup={getAllTaxGroups}
                getAllTaxBracket={getAllTaxBracket}
                allTaxBrackets={allTaxBrackets}
            />
        </div>
    );
};
