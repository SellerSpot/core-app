import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import ButtonComponent from './Button';
import { IButtonProps } from './Button.types';

const Template: Story<IButtonProps> = (args: IButtonProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <ButtonComponent {...args} />
        </ThemeProvider>
    </Provider>
);

export const Button = Template.bind({});
Button.args = {
    label: 'Notifications',
    variant: 'contained',
    size: 'small',
    state: 'success',
    disabled: false,
    startIcon: <ICONS.OTHER.NOTIFICATION />,
} as IButtonProps;

export default {
    title: 'Components/Atoms',
    component: ButtonComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;
