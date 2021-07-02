import { State, useState } from '@hookstate/core';
import Icon from '@iconify/react';
import { Button } from '@sellerspot/universal-components';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React, { ReactElement, useEffect } from 'react';
import { ICONS } from 'utilities/utilities';
import { TaxBracketSliderBase } from './Components/TaxBracket/TaxBracketSliderBase/TaxBracketSliderBase';
import { TaxBracketsTable } from './Components/TaxBracket/TaxBracketTable/TaxBracketTable';
import { TaxGroupSlider } from './Components/TaxGroup/TaxGroupSlider/TaxGroupSlider';
import { TaxGroupsTable } from './Components/TaxGroup/TaxGroupTable/TaxGroupTable';
import styles from './TaxSettings.module.scss';
import { TaxSettingsService } from './TaxSettings.service';
import { ITaxSettingsState } from './TaxSettings.types';

const UpperPageHeaderComponent = (props: { pageState: State<ITaxSettingsState> }) => {
    // props
    const { pageState } = props;
    // components
    const NewTaxBracketButton = () => {
        // handlers
        const handleOnClick = async () => {
            pageState.taxBracketSlider.merge({
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

const LowerPageHeaderComponent = (props: { pageState: State<ITaxSettingsState> }) => {
    // props
    const { pageState } = props;

    // components
    const NewTaxGroupButton = () => {
        // handlers
        const onClickHandler = () => {
            pageState.taxGroupSlider.merge({
                isEditMode: false,
                prefillData: null,
                showSliderModal: true,
            });
        };

        // draw
        return (
            <Button
                label="NEW TAX GROUP"
                theme="primary"
                variant="contained"
                onClick={onClickHandler}
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
        isTaxBracketTableLoading: true,
        isTaxGroupTableLoading: true,
        taxBracketSlider: {
            showModal: false,
            prefillData: null,
            mode: 'create',
        },
        taxGroupSlider: {
            isEditMode: false,
            prefillData: null,
            showSliderModal: false,
            createTaxBracketSliderState: {
                showSliderModal: false,
                bracketName: '',
            },
        },
    });

    // handlers
    const getAllTaxBracket = async (): Promise<void> => {
        const allTaxBrackets = await TaxSettingsService.getAllTaxBracket();
        pageState.merge({
            taxBrackets: allTaxBrackets,
            isTaxBracketTableLoading: false,
        });
    };
    const getAllTaxGroup = async (): Promise<void> => {
        const allTaxGroups = await TaxSettingsService.getAllTaxGroup();
        pageState.merge({
            taxGroups: allTaxGroups,
            isTaxGroupTableLoading: false,
        });
    };

    // effects
    useEffect(() => {
        // setting loading states
        pageState.isTaxBracketTableLoading.set(true);
        pageState.isTaxGroupTableLoading.set(true);
        // fetching data from server
        getAllTaxBracket();
        getAllTaxGroup();
    }, []);

    // draw
    return (
        <div className={styles.wrapper}>
            <div className={styles.taxBracketsWrapper}>
                <UpperPageHeaderComponent pageState={pageState} />
                <TaxBracketsTable pageState={pageState} getAllTaxBracket={getAllTaxBracket} />
                <TaxBracketSliderBase
                    sliderState={pageState.taxBracketSlider}
                    getAllTaxBracket={getAllTaxBracket}
                />
            </div>
            <div className={styles.taxGroupsWrapper}>
                <LowerPageHeaderComponent pageState={pageState} />
                <TaxGroupsTable pageState={pageState} getAllTaxGroup={getAllTaxGroup} />
                <TaxGroupSlider
                    getAllTaxGroup={getAllTaxGroup}
                    sliderState={pageState.taxGroupSlider}
                    allTaxGroup={pageState.taxGroups.get()}
                />
            </div>
        </div>
    );
};
