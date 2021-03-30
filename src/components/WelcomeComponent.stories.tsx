import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

interface IWelcomeComponentProps {
    message: string;
}

const Template: Story<IWelcomeComponentProps> = (args: IWelcomeComponentProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <h1>{args.message}</h1>
            <br />
            <hr />
            <br />
            <h6>
                Feel free to navigate around to browse and play with all the components used in our
                core app
            </h6>
        </ThemeProvider>
    </Provider>
);

export const WelcomeComponent = Template.bind({});
WelcomeComponent.args = {
    message: 'Welcome to Sellerspot Core App Storybook',
} as IWelcomeComponentProps;

export default {
    title: 'Welcome Component',
    component: WelcomeComponent,
} as Meta;
