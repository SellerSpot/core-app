import { useState } from '@hookstate/core';
import React, { ReactElement } from 'react';
import { rawClone } from 'utilities/general';
import { TaxBracketSection } from './Components/TaxBracketSection/TaxBracketSection';
import { TaxGroupSection } from './Components/TaxGroupSection/TaxGroupSection';
import styles from './TaxSetting.module.scss';
import { TaxSettingService } from './TaxSetting.service';
import { ITaxSettingPageState } from './TaxSetting.types';

export const TaxSetting = (): ReactElement => {
    // state
    const pageState = useState<ITaxSettingPageState>({
        allTaxBrackets: [],
        taxBracketSection: {
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
            taxBracketSlider: {
                showModal: false,
                mode: 'create',
                prefillData: null,
            },
        },
    });

    // handlers
    const getAllTaxBrackets = async () => {
        // request
        const allTaxBrackets = await TaxSettingService.getAllTaxBracket();
        // state update
        pageState.allTaxBrackets.set(allTaxBrackets);
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
                    getAllTaxBrackets={getAllTaxBrackets}
                    allTaxBrackets={rawClone(pageState.allTaxBrackets.get())}
                />
            </div>
            <div className={styles.taxGroupSection}>
                <TaxGroupSection
                    sectionState={pageState.taxGroupSection}
                    getAllTaxBrackets={getAllTaxBrackets}
                    allTaxBrackets={rawClone(pageState.allTaxBrackets.get())}
                />
            </div>
        </div>
    );
};
