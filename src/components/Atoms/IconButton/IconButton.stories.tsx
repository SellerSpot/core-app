import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import IconButton from './IconButton';
import { IIconButtonProps } from './IconButton.types';

const Template: Story<IIconButtonProps> = (args: IIconButtonProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <IconButton state={'warning'}>
                <ICONS.WORKSPACES.HOME />
            </IconButton>
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});

export default {
    title: 'Components/Atoms/IconButton',
    component: Component,
} as Meta;
