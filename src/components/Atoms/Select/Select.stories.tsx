import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import SelectComponent from './Select';
import { ISelectProps } from './Select.types';

const Template: Story<ISelectProps> = (args: ISelectProps) => <SelectComponent {...args} />;

export const Select = Template.bind({});
Select.args = {
    options: [
        {
            text: 'Option 1',
            value: '1',
        },
        {
            text: 'Option 2',
            value: '2',
        },
        {
            text: 'Option 3',
            value: '3',
        },
    ],
    label: 'Select',
    value: '3',
    onChange: (event) => alert(event.target.value),
} as ISelectProps;

export default {
    title: 'Components/Atoms',
    component: SelectComponent,
} as Meta;
