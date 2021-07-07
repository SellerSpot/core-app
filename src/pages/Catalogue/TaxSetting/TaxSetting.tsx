import { useState } from '@hookstate/core';
import React, { ReactElement } from 'react';
import { TaxBracketSection } from './Components/TaxBracketSection/TaxBracketSection';
import { TaxGroupSection } from './Components/TaxGroupSection/TaxGroupSection';
import styles from './TaxSetting.module.scss';
import { ITaxSettingPageState } from './TaxSetting.types';

export const TaxSetting = (): ReactElement => {
    // state
    const pageState = useState<ITaxSettingPageState>({
        allBrackets: [],
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketSection}>
                <TaxBracketSection pageState={pageState} />
            </div>
            <div className={styles.taxGroupSection}>
                <TaxGroupSection allBrackets={pageState.allBrackets.get()} />
            </div>
        </div>
    );
};
