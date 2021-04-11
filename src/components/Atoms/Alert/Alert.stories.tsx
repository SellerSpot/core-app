import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import { colorThemes, fontSizeThemes } from 'config/themes';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { store } from 'store/store';
import AlertComponent from './Alert';
import { IAlertProps } from './Alert.types';

export default {
    title: 'Components/Atoms',
    component: AlertComponent,
} as Meta;

const Component = (args: IAlertProps) => {
    // const themeState = useSelector(themeSelector);
    // const colors = colorThemes[themeState.colorTheme];
    // const fontSizes = fontSizeThemes[themeState.fontSizeTheme];
    return (
        <ThemeProvider>
            <AlertComponent {...args}>
                Alert component has been successfully completed.
            </AlertComponent>
        </ThemeProvider>
    );
};

const Template: Story<IAlertProps> = (args: IAlertProps) => (
    <Provider store={store}>
        <Component {...args} />
    </Provider>
);

export const Alert = Template.bind({});

Alert.args = {
    type: 'success',
    title: 'Operation Completed',
} as IAlertProps;
