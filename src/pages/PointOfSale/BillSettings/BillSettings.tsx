import React, { ReactElement } from 'react';
import cn from 'classnames';
import {
    Button,
    ISelectOption,
    numberFormatINRCurrency,
    Select,
} from '@sellerspot/universal-components';
import { EBILL_SIZES, getBillSizeByName } from '@sellerspot/universal-types';
import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import styles from './BillSettings.module.scss';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { IBill90MMProps } from 'components/Compounds/Bill90MM/Bill90MM.types';
import { BillA4 } from 'components/Compounds/BillA4/BillA4';
import { Bill90MM } from 'components/Compounds/Bill90MM/Bill90MM';
import { useState } from '@hookstate/core';
import { BillA4Settings } from './components/BillA4Settings';
import { Bill90MMSettings } from './components/Bill90MMSettings';

type TBillComponentMap = {
    [key in keyof typeof EBILL_SIZES]: {
        BILL: (props?: unknown | { dimension: TDimension }) => ReactElement;
        SETTINGS: (props?: unknown) => ReactElement;
        /**
         * dimensions should be in px (approximate value is enough)
         * it helps in  billPreview holder component for better viewing experience
         */
        dimension: {
            width: number;
            height?: number; // height might not be needed
        };
    };
};

export type TDimension = { width: 793 };

export const billSizeComponentMap: TBillComponentMap = {
    BILL_A4: { BILL: BillA4, SETTINGS: BillA4Settings, dimension: { width: 793 } },
    BILL_90MM: { BILL: Bill90MM, SETTINGS: Bill90MMSettings, dimension: { width: 340 } },
};

const billOptions: ISelectOption<keyof typeof EBILL_SIZES>[] = [
    { key: 'BILL_A4', label: 'A4', value: 'a4id' },
    { key: 'BILL_90MM', label: '90mm', value: '90mmid' },
];

const billTestData: IBill90MMProps = {
    billData: {
        products: [
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
            {
                name: 'Sample Product asldkfj',
                subTotal: numberFormatINRCurrency(24000),
                quantity: 1,
                stockUnit: 'kgs',
                unitPrice: numberFormatINRCurrency(12),
            },
        ],
        saleDiscount: numberFormatINRCurrency(230),
        saleSubTotal: numberFormatINRCurrency(200),
        saleTotalTax: numberFormatINRCurrency(25),
        saleTotalTaxPercentage: 13,
        storeName: 'Sreenithi Margin Free',
        saleTotal: numberFormatINRCurrency(250000),
        footerMessage: 'Sample Footer Message',
        storeAddress: `12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1
        0431 2411562 / +91 8903307270`,
    },
};

export const BillSettings = (): ReactElement => {
    // state
    const billSettingsSwitchState = useState<keyof typeof EBILL_SIZES>(
        getBillSizeByName('BILL_A4'),
    );

    // handlers
    const onSaveChangesHandler = (): void => {
        console.log('onSaveChangesHandler');
    };
    const onBillSettingViewChangeHandler = (key: keyof typeof EBILL_SIZES) => () => {
        billSettingsSwitchState.set(key);
    };

    // draw
    const CurrentBillComponent = billSizeComponentMap[billSettingsSwitchState.get()].BILL;
    const CurrentBillSettingsComponent =
        billSizeComponentMap[billSettingsSwitchState.get()].SETTINGS;
    const currentBillDimension = billSizeComponentMap[billSettingsSwitchState.get()].dimension;

    return (
        <div className={styles.wrapper}>
            <PageHeader
                title="Bill settings"
                actions={[
                    <Button
                        key="save-changes"
                        label="Save Changes"
                        variant="contained"
                        theme="primary"
                        onClick={onSaveChangesHandler}
                    />,
                ]}
            />
            <div className={styles.bodyWrapper}>
                <div className={styles.settingSection}>
                    <div className={styles.defaultSettingSection}>
                        <Select
                            label="Default Bill Size"
                            options={billOptions}
                            defaultValue={billOptions[0]}
                            isClearable={false}
                        />
                    </div>
                    <div className={styles.aggregatedSettingSection}>
                        <div className={styles.billSettingsSwitcherWrapper}>
                            <div className={styles.billSwitcherContainer}>
                                {billOptions.map((billOption) => (
                                    <h5
                                        title={`Change settings for ${billOption.label}`}
                                        key={billOption.key}
                                        className={cn(styles.billSwitch, {
                                            [styles.billSwitchActive]:
                                                billOption.key === billSettingsSwitchState.get(),
                                        })}
                                        onClick={onBillSettingViewChangeHandler(billOption.key)}
                                    >
                                        {billOption.label}
                                    </h5>
                                ))}
                            </div>
                        </div>
                        <div className={styles.currentBillSettingsWrapper}>
                            <CurrentBillSettingsComponent {...(billTestData as unknown)} />
                        </div>
                    </div>
                </div>
                <div className={styles.previewSection}>
                    <BillHolder>
                        <CurrentBillComponent
                            {...(billTestData as unknown)}
                            {...({ dimension: currentBillDimension } as unknown)}
                        />
                    </BillHolder>
                </div>
            </div>
        </div>
    );
};
