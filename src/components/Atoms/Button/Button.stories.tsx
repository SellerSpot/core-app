import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
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
    label: 'Click Here',
} as IButtonProps;

export default {
    title: 'Components/Atoms/Button',
    component: Component,
} as Meta;
