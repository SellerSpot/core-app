import React, { ReactElement, useEffect, useState as useNativeUseState } from 'react';
import cn from 'classnames';
import {
    Button,
    ISelectOption,
    Select,
    showNotify,
    Skeleton,
    ToolTip,
} from '@sellerspot/universal-components';
import { EBILL_SIZES, IBillSettings } from '@sellerspot/universal-types';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './BillSettings.module.scss';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { BillA4 } from 'components/Compounds/BillA4/BillA4';
import { Bill90MM } from 'components/Compounds/Bill90MM/Bill90MM';
import { useState } from '@hookstate/core';
import { BillA4Settings } from './components/BillA4Settings';
import { Bill90MMSettings } from './components/Bill90MMSettings';
import { TBillComponentMap } from './BillSettings.types';
import { BillSettingsService } from './BillSettings.service';
import { isEqual, times } from 'lodash';
import { rawClone } from 'utilities/general';
import { Dummies } from 'dummies/Dummies';

export const billSizeComponentMap: TBillComponentMap = {
    BILL_A4: {
        BILL: BillA4,
        SETTINGS: BillA4Settings,
        dimension: BillSettingsService.billDimentsions.BILL_A4,
    },
    BILL_90MM: {
        BILL: Bill90MM,
        SETTINGS: Bill90MMSettings,
        dimension: BillSettingsService.billDimentsions.BILL_90MM,
    },
};

export const BillSettings = (): ReactElement => {
    // state
    const [hasChanges, setHasChanges] = useNativeUseState(false);
    const isLoading = useState(true);
    const isSaving = useState(false);
    const billSettingsStateInitial = useState<IBillSettings>(null);
    const billSettingsState = useState<IBillSettings>(null);

    const billSettingsSwitchState = useState<EBILL_SIZES>(EBILL_SIZES.BILL_A4);

    // handlers
    const onSaveChangesHandler = (): void => {
        if (hasChanges) {
            isSaving.set(true);
            BillSettingsService.updateBillSettings(rawClone(billSettingsState.get()))
                .then((billSettings) => {
                    billSettingsStateInitial.set(billSettings);
                    billSettingsState.set(billSettings);
                    isSaving.set(false);
                    showNotify('Bill settings saved successfully!', { theme: 'success' });
                })
                .catch(() => {
                    isSaving.set(false);
                    showNotify('Something went wrong try again later!', { theme: 'error' });
                });
        }
    };
    const onBillSettingViewChangeHandler = (key: EBILL_SIZES) => () => {
        billSettingsSwitchState.set(key);
    };
    // check if the bill settings have changed
    const checkHasChanges = async () => {
        if (!isEqual(rawClone(billSettingsStateInitial.get()), rawClone(billSettingsState.get()))) {
            setHasChanges(true);
        } else {
            setHasChanges(false);
        }
    };
    const getSaveButtonTitle = () => {
        let saveButtonTitle = hasChanges ? 'Save active changes' : 'No active changes found';
        if (isSaving.get()) {
            saveButtonTitle = 'Saving';
        }
        return saveButtonTitle;
    };

    // effects
    // fetch settings on mount
    useEffect(() => {
        BillSettingsService.fetchBillSettings()
            .then((settings) => {
                billSettingsStateInitial.set(rawClone(settings));
                billSettingsState.set(rawClone(settings));
                billSettingsSwitchState.set(settings.defaultBill);
                isLoading.set(false);
            })
            .catch(() => {
                showNotify('Something went wrong try again later!', { theme: 'error' });
            });
    }, []);

    // change detection effect
    useEffect(() => {
        checkHasChanges();
    }, [billSettingsState, billSettingsStateInitial]);

    // draw
    const currentBillName = billSettingsSwitchState.get();
    const CurrentBillSettingsComponent = billSizeComponentMap[currentBillName].SETTINGS;
    const CurrentBillComponent = billSizeComponentMap[currentBillName].BILL;
    const currentBillDimension = billSizeComponentMap[currentBillName].dimension;
    // current bill State, which will be passed to corresponding billSeettings and bill components
    const currentBillSettingsState = billSettingsState?.bills?.[currentBillName];

    return (
        <div className={styles.wrapper}>
            <PageHeader
                title="Bill settings"
                actions={[
                    isLoading.get() ? (
                        <Skeleton width="150px" height="50px" />
                    ) : (
                        <ToolTip content={getSaveButtonTitle()}>
                            <Button
                                key="save-changes"
                                label={isSaving.get() ? 'Saving' : 'Save Changes'}
                                isLoading={isSaving.get()}
                                variant="contained"
                                theme="primary"
                                onClick={onSaveChangesHandler}
                                disabled={!hasChanges || isSaving.get()}
                            />
                        </ToolTip>
                    ),
                ]}
            />
            <div className={styles.bodyWrapper}>
                <div className={styles.settingSection}>
                    <div className={styles.defaultSettingSection}>
                        {isLoading.get() ? (
                            <Skeleton width="100%" height="50px" />
                        ) : (
                            <Select
                                label="Default Bill Size"
                                options={BillSettingsService.billOptions}
                                value={BillSettingsService.billOptions.find(
                                    (billOption) =>
                                        billOption.key === billSettingsState.defaultBill.get(),
                                )}
                                onChange={(option: ISelectOption) =>
                                    billSettingsState.defaultBill.set(option.key as EBILL_SIZES)
                                }
                                isClearable={false}
                            />
                        )}
                    </div>
                    <div className={styles.aggregatedSettingSection}>
                        <div className={styles.billSettingsSwitcherWrapper}>
                            {isLoading.get() ? (
                                <Skeleton width="100%" height="50px" />
                            ) : (
                                <div className={styles.billSwitcherContainer}>
                                    {BillSettingsService.billOptions.map((billOption) => (
                                        <h5
                                            title={`Change settings for ${billOption.label}`}
                                            key={billOption.key}
                                            className={cn(styles.billSwitch, {
                                                [styles.billSwitchActive]:
                                                    billOption.key ===
                                                    billSettingsSwitchState.get(),
                                            })}
                                            onClick={onBillSettingViewChangeHandler(
                                                billOption.key as EBILL_SIZES,
                                            )}
                                        >
                                            {billOption.label}
                                        </h5>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.currentBillSettingsWrapper}>
                            {isLoading.get() ? (
                                times(5, (i) => <Skeleton key={i} width="100%" height="50px" />)
                            ) : (
                                <CurrentBillSettingsComponent
                                    // do not remove, it is used for resize / switch scaling inside BillHolder component
                                    {...({ state: currentBillSettingsState } as unknown)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.previewSection}>
                    {isLoading.get() ? (
                        <Skeleton width="100%" height="100%" />
                    ) : (
                        <>
                            <BillHolder>
                                <CurrentBillComponent
                                    // do not remove dimension, it is used for resize / switch scaling inside BillHolder component
                                    data={Dummies.salesHistory.getSalesData()[0]}
                                    settings={rawClone(currentBillSettingsState.get())}
                                    dimension={currentBillDimension}
                                />
                            </BillHolder>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
