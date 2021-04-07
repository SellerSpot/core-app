import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import AlertComponent from './Alert';
import { IAlertProps } from './Alert.types';

export default {
    title: 'Components/Atoms',
    component: AlertComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;

const Template: Story<IAlertProps> = (args: IAlertProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <AlertComponent {...args}>
                Alert component has been successfully completed.
            </AlertComponent>
        </ThemeProvider>
    </Provider>
);

export const Alert = Template.bind({});

Alert.args = {
    type: 'success',
    title: 'Operation Completed',
} as IAlertProps;
