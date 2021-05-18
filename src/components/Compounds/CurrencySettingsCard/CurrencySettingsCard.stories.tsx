import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ICurrency, ICurrencySettingsCardProps } from './CurrencySettingsCard.types';
import CurrencySettingsCardComponent from './CurrencySettingsCard';

const currenciesData: ICurrency[] = [
    {
        currencyName: 'INR',
        currencyLogo: '₹',
    },
    {
        currencyName: 'USD',
        currencyLogo: '$',
    },
    {
        currencyName: 'YEN',
        currencyLogo: '¥',
    },
];

const Template: Story = (args: ICurrencySettingsCardProps) => (
    <CurrencySettingsCardComponent {...args} />
);

export const CurrencySettingsCard = Template.bind({});
CurrencySettingsCard.args = {
    currencyChangeCallback: (currencyIndex) => {
        alert(currenciesData[currencyIndex].currencyName);
    },
    currencies: currenciesData,
} as ICurrencySettingsCardProps;

export default {
    title: 'Design System/Compounds/Currency Settings Card',
    component: CurrencySettingsCardComponent,
} as Meta;
