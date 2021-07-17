import { PageHeader } from 'components/Compounds/PageHeader/PageHeader';
import React from 'react';
import { ReactElement } from 'react';
import {
    Button,
    ISelectOption,
    numberFormatINRCurrency,
    Select,
} from '@sellerspot/universal-components';
import Styles from './BillSettings.module.scss';
import { BillHolder } from 'components/Compounds/BillHolder/BillHolder';
import { IBill90MMProps } from 'components/Compounds/Bill90MM/Bill90MM.types';
import { Bill90MM } from 'components/Compounds/Bill90MM/Bill90MM';

export const BillSettings = (): ReactElement => {
    // locals
    const billOptions: ISelectOption[] = [
        { label: 'A4 Page', value: ' ' },
        { label: '90mm', value: '90mmid' },
    ];

    // handlers
    const onSaveChangesHandler = (): void => {
        console.log('onSaveChangesHandler');
    };

    const billTestData: IBill90MMProps['billData'] = {
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
        headerMessage: 'Sample Header Message',
    };

    return (
        <div className={Styles.wrapper}>
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
            <div className={Styles.bodyWrapper}>
                <div className={Styles.settingSection}>
                    <div className={Styles.defaultSettingSection}>
                        <Select
                            label="Default Bill Size"
                            options={billOptions}
                            defaultValue={billOptions[0]}
                        />
                    </div>
                    <div className={Styles.aggregatedSettingSection}></div>
                </div>
                <div className={Styles.previewSection}>
                    <BillHolder>
                        <Bill90MM billData={billTestData} />
                    </BillHolder>
                </div>
            </div>
        </div>
    );
};
