import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Alert from './Alert';
import { IAlertProps } from './Alert.types';

const Template: Story<IAlertProps> = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Alert type={'success'} title={'Operation Completed!'}>
                Alert component has been successfully completed.
            </Alert>
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});

export default {
    title: 'Components/Atoms/Alert',
    component: Component,
} as Meta;
