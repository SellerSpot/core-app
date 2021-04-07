import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import IconButtonComponent from './IconButton';
import { IIconButtonProps } from './IconButton.types';

const Template: Story<IIconButtonProps> = (args: IIconButtonProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <IconButtonComponent state={'warning'} icon={<ICONS.WORKSPACES.HOME />} />
        </ThemeProvider>
    </Provider>
);

export const IconButton = Template.bind({});

export default {
    title: 'Components/Atoms',
    component: IconButtonComponent,
} as Meta;
