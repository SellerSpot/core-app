import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ExpandWorkspaceMenuButton, {
    IExpandWorkspaceMenuButtonProps,
} from './ExpandWorkspaceMenuButton';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <ExpandWorkspaceMenuButton />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {} as IExpandWorkspaceMenuButtonProps;

export default {
    title: 'Components/Atoms/ExpandWorkspaceMenuButton',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
