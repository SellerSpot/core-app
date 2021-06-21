import React, { ReactElement, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { Card, showNotify, CircularProgress } from '@sellerspot/universal-components';
import Select from 'react-select';

import { ICurrency } from './CurrencySetting.types';
import styles from './CurrencySetting.module.scss';
import { ISelectOption } from 'typings/common.types';
import { Loader } from 'components/Atoms/Loader/Loader';
import CurrencySettingService from './CurrentSetting.service';
import { introduceDelay } from 'utilities/general';

export const CurrencySetting = (): ReactElement => {
    // state
    const currencies = useState<ICurrency[]>([]);
    const currentCurrency = useState<ICurrency>(null);
    const loading = useState<boolean>(true);
    const isSaving = useState<boolean>(false);

    // handlers
    const getFormattedCurrency = (currency: ICurrency): ISelectOption<string> => ({
        label: `${currency.name} (${currency.logo})`,
        value: JSON.stringify(currency),
    });

    const getFormattedOptions = (): ISelectOption<string>[] =>
        currencies.map((currency) => getFormattedCurrency(currency.get()));

    const onSelectChangeHandler = async (currency: string) => {
        isSaving.set(true);
        currentCurrency.set(JSON.parse(currency));
        // fire an api call to save the changed currency
        await introduceDelay();
        showNotify('Store currency has been updated', { theme: 'success' });
        isSaving.set(false);
    };

    // effects
    useEffect(() => {
        // get from api
        CurrencySettingService.fetchStoreCurrencies()
            .then((data) => {
                currencies.set(data.currencies);
                currentCurrency.set(data.currentCurrency);
                loading.set(false);
            })
            .catch((err) => {
                showNotify(err);
                // set error flag up and show error happened in the hard and ask to reload through reload call to action button
            });
    }, []);

    // draw
    return (
        <Loader isLoading={loading.get()} wrapperDivClassName={styles.wrapper} loaderType="shimmer">
            {!loading.get() && (
                <Card
                    className={{
                        cardWrapper: styles.cardWrapper,
                        contentWrapper: styles.contentWrapper,
                    }}
                    content={
                        <div className={styles.content}>
                            <div className={styles.contentLHS}>
                                <h4>Store Currency</h4>
                                <p>Please select the currency to use across your store</p>
                            </div>
                            <div className={styles.saveNotifier}>
                                {isSaving.get() && (
                                    <>
                                        <CircularProgress size={'12px'} theme="auto" />
                                        <div>saving</div>
                                    </>
                                )}
                            </div>
                            <div className={styles.selectOptionWrapper}>
                                <Select
                                    classNamePrefix="custom-select"
                                    options={getFormattedOptions()}
                                    onChange={(currency) => onSelectChangeHandler(currency.value)}
                                    value={getFormattedCurrency(currentCurrency.get())}
                                    isDisabled={isSaving.get()}
                                />
                            </div>
                        </div>
                    }
                />
            )}
        </Loader>
    );
};
