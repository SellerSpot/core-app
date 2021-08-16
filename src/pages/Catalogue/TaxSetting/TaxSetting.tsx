import { useState } from '@hookstate/core';
import React, { ReactElement } from 'react';
import { TaxBracketSection } from './Components/TaxBracketSection/TaxBracketSection';
import { TaxGroupSection } from './Components/TaxGroupSection/TaxGroupSection';
import styles from './TaxSetting.module.scss';
import { TaxSettingService } from './TaxSetting.service';
import { ITaxSettingPageState } from './TaxSetting.types';

export const TaxSetting = (): ReactElement => {
    // state
    const pageState = useState<ITaxSettingPageState>({
        taxBracketSection: {
            allTaxBrackets: [],
            isTableLoading: true,
            sliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
        },
        taxGroupSection: {
            allTaxGroups: [],
            isTableLoading: true,
            sliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
            taxBracketSliderModal: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
        },
    });

    // handlers
    const getAllTaxBracket = async () => {
        // request
        const allTaxBrackets = await TaxSettingService.getAllTaxBracket();
        // state update
        pageState.taxBracketSection.allTaxBrackets.set(allTaxBrackets);
        // reset loading if necessary
        pageState.taxBracketSection.isTableLoading.get() &&
            pageState.taxBracketSection.isTableLoading.set(false);
    };

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketSection}>
                <TaxBracketSection
                    sectionState={pageState.taxBracketSection}
                    getAllTaxBracket={getAllTaxBracket}
                />
            </div>
            <div className={styles.taxGroupSection}>
                <TaxGroupSection
                    sectionState={pageState.taxGroupSection}
                    getAllTaxBracket={getAllTaxBracket}
                />
            </div>
        </div>
    );
};
