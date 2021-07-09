import { useState } from '@hookstate/core';
import React, { ReactElement } from 'react';
import { TaxBracketSection } from './Components/TaxBracketSection/TaxBracketSection';
import styles from './TaxSetting.module.scss';
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
        },
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketSection}>
                <TaxBracketSection sectionState={pageState.taxBracketSection} />
            </div>
            {/* <div className={styles.taxGroupSection}>
                <TaxGroupSection allTaxBrackets={pageState.allTaxBrackets.get()} />
            </div> */}
        </div>
    );
};
