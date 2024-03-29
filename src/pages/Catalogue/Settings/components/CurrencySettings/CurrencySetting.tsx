import { useState } from '@hookstate/core';
import { Card, ISelectOption, Select, showNotify } from '@sellerspot/universal-components';
import { IErrorResponse, IStoreCurrency } from '@sellerspot/universal-types';
import { Loader } from 'components/Atoms/Loader/Loader';
import { SavingNotifier } from 'components/Atoms/SavingNotifier/SavingNotifier';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { tenantSelector } from 'store/models/app';
import styles from './CurrencySetting.module.scss';
import CurrencySettingService from './CurrentSetting.service';

export const CurrencySetting = (): ReactElement => {
    // hooks
    const tenantDetails = useSelector(tenantSelector);

    // state
    const currencies = useState<IStoreCurrency[]>([]);
    const loading = useState<boolean>(true);
    const isSaving = useState<boolean>(false);

    // handlers
    const getFormattedCurrency = (currency: IStoreCurrency): ISelectOption => ({
        label: `${currency.code} (${currency.symbol})`,
        value: JSON.stringify(currency),
    });

    const getFormattedOptions = (): ISelectOption[] =>
        currencies.map((currency) => getFormattedCurrency(currency.get()));

    const onSelectChangeHandler = async (currencyString: string) => {
        try {
            isSaving.set(true);
            const currency = JSON.parse(currencyString) as IStoreCurrency;
            await CurrencySettingService.udpateStoreCurrency(currency.id);
        } catch (err) {
            const error = err as IErrorResponse;
            showNotify(error.message);
        } finally {
            isSaving.set(false);
        }
    };

    // effects
    useEffect(() => {
        // get from api
        CurrencySettingService.fetchStoreCurrencies()
            .then((data) => {
                currencies.set(data);
                loading.set(false);
            })
            .catch((err) => {
                showNotify(err);
                // set error flag up and show error happened and ask to reload through reload call to action button
            });
    }, []);

    // draw
    return (
        <Loader isLoading={loading.get()} loaderType="shimmer">
            <div className={styles.wrapper}>
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
                                <div className={styles.savingNotifierWrapper}>
                                    <SavingNotifier isSaving={isSaving.get()} />
                                </div>
                                <div className={styles.selectOptionWrapper}>
                                    <Select
                                        options={getFormattedOptions()}
                                        onChange={(currency: ISelectOption) =>
                                            onSelectChangeHandler(currency.value)
                                        }
                                        value={getFormattedCurrency(tenantDetails?.storeCurrency)}
                                        isDisabled={isSaving.get()}
                                        label="Currency"
                                        isMulti={false}
                                    />
                                </div>
                            </div>
                        }
                    />
                )}
            </div>
        </Loader>
    );
};
