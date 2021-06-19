import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import { TaxBracketSlider } from './Components/TaxBracket/TaxBracketSlider/TaxBracketSlider';
import { TaxBracketsTable } from './Components/TaxBracket/TaxBracketTable/TaxBracketTable';
import { TaxGroupSlider } from './Components/TaxGroup/TaxGroupSlider/TaxGroupSlider';
import { TaxGroupsTable } from './Components/TaxGroup/TaxGroupTable/TaxGroupTable';
import styles from './TaxSettings.module.scss';
import { TaxSettingsService } from './TaxSettings.service';
import { ITaxSettingsState } from './TaxSettings.types';

const UpperPageHeaderComponent = (props: { pageState: State<ITaxSettingsState> }) => {
    // props
    const {} = props;
    // components
    const NewTaxBracketButton = () => {
        return (
            <Button
                label="NEW TAX BRACKET"
                theme="primary"
                variant="contained"
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

const LowerPageHeaderComponent = (props: { pageState: State<ITaxSettingsState> }) => {
    // props
    const {} = props;
    // components
    const NewTaxGroupButton = () => {
        return (
            <Button
                label="NEW TAX GROUP"
                theme="primary"
                variant="contained"
                startIcon={<Icon icon={ICONS.outlineAdd} />}
            />
        );
    };
    // draw
    return (
        <PageHeader title="Tax Groups" actions={[<NewTaxGroupButton key="newTaxGroupButton" />]} />
    );
};

export const TaxSettings = (): ReactElement => {
    // state
    const pageState = useState<ITaxSettingsState>({
        taxBrackets: [],
        taxGroups: [],
        isTaxBracketsTableLoading: false,
        taxBracketsSlider: {
            isEditMode: false,
            prefillData: null,
            showSliderModal: false,
        },
    });

    // handlers
    const getAllTaxBracket = async (): Promise<void> => {
        const allTaxBrackets = await TaxSettingsService.getAllTaxBracket();
        pageState.merge({
            taxBrackets: allTaxBrackets,
            isTaxBracketsTableLoading: false,
        });
    };

    // effects
    useEffect(() => {
        pageState.isTaxBracketsTableLoading.set(true);
        getAllTaxBracket();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketsWrapper}>
                <UpperPageHeaderComponent pageState={pageState} />
                <TaxBracketsTable pageState={pageState} />
                <TaxBracketSlider
                    sliderState={pageState.taxBracketsSlider}
                    getAllTaxBracket={getAllTaxBracket}
                />
            </div>
            <div className={styles.taxGroupsWrapper}>
                <LowerPageHeaderComponent pageState={pageState} />
                <TaxGroupsTable pageState={pageState} />
                <TaxGroupSlider />
            </div>
        </div>
    );
};
