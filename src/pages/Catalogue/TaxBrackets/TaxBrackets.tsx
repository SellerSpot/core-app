import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/utilities';
import styles from './TaxBrackets.module.scss';
import { ITaxBracketsState } from './TaxBrackets.types';

const UpperPageHeaderComponent = (props: { pageState: State<ITaxBracketsState> }) => {
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

const LowerPageHeaderComponent = (props: { pageState: State<ITaxBracketsState> }) => {
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

export const TaxBrackets = (): ReactElement => {
    // state
    const pageState = useState<ITaxBracketsState>({
        taxBrackets: [],
        taxGroups: [],
        showSliderModal: false,
    });

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketsWrapper}>
                <UpperPageHeaderComponent pageState={pageState} />
            </div>
            <div className={styles.taxGroupsWrapper}>
                <LowerPageHeaderComponent pageState={pageState} />
            </div>
        </div>
    );
};
