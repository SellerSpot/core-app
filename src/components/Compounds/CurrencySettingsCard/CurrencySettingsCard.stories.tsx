import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import CurrencySettingsCardComponent from './CurrencySettingsCard';
import { ICurrency, ICurrencySettingsCardProps } from './CurrencySettingsCard.types';

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
    title: 'Components',
    component: CurrencySettingsCardComponent,
} as Meta;
