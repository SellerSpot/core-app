import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import Button from './Button';
import { IButtonProps } from './Button.types';

const Template: Story<IButtonProps> = (args: IButtonProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <Button {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    label: 'Notifications',
    variant: 'contained',
    size: 'small',
    state: 'success',
    disabled: false,
    startIcon: <ICONS.OTHER.NOTIFICATION />,
} as IButtonProps;

export default {
    title: 'Components/Atoms/Button',
    component: Component,
    argTypes: {
        state: {
            control: {
                type: 'inline-radio',
                options: ['success', 'danger', 'warning', 'default', 'accent'],
            },
        },
        variant: {
            control: {
                type: 'inline-radio',
                options: ['contained', 'text', 'outlined'],
            },
        },
        size: {
            control: {
                type: 'inline-radio',
                options: ['small', 'medium', 'large'],
            },
        },
    },
} as Meta;
