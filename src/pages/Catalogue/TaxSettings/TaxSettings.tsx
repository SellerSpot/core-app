import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import { TaxBracketsTable } from './Components/TaxBracketTable/TaxBracketTable';
import { TaxGroupsTable } from './Components/TaxGroupTable/TaxGroupTable';
import styles from './TaxSettings.module.scss';
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
        showSliderModal: false,
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketsWrapper}>
                <UpperPageHeaderComponent pageState={pageState} />
                <TaxBracketsTable pageState={pageState} />
            </div>
            <div className={styles.taxGroupsWrapper}>
                <LowerPageHeaderComponent pageState={pageState} />
                <TaxGroupsTable pageState={pageState} />
            </div>
        </div>
    );
};
