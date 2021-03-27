import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'store/store';

interface IWelcomeComponentProps {
    message: string;
}

const Template: Story<IWelcomeComponentProps> = (args: IWelcomeComponentProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <h1>{args.message}</h1>
        </ThemeProvider>
    </Provider>
);

export const WelcomeComponent = Template.bind({});
WelcomeComponent.args = {
    message: 'Welcome to Sellerspot Core App Storybook',
} as IWelcomeComponentProps;

export default {
    title: 'Components',
    component: WelcomeComponent,
} as Meta;
