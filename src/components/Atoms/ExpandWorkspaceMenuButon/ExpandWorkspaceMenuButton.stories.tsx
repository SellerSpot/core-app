import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ExpandWorkspaceMenuButtonComponent, {
    IExpandWorkspaceMenuButtonProps,
} from './ExpandWorkspaceMenuButton';

const Template: Story = () => (
    <Provider store={store}>
        <ThemeProvider>
            <ExpandWorkspaceMenuButtonComponent />
        </ThemeProvider>
    </Provider>
);

export const ExpandWorkspaceMenuButton = Template.bind({});
ExpandWorkspaceMenuButton.args = {} as IExpandWorkspaceMenuButtonProps;

export default {
    title: 'Components/Atoms',
    component: ExpandWorkspaceMenuButtonComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;
