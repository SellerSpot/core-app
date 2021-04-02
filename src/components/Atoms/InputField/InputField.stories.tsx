import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import InputField from './InputField';
import { IInputFieldProps } from './InputField.types';

const Template: Story<IInputFieldProps> = (args: IInputFieldProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <div
                style={{
                    maxWidth: '300px',
                }}
            >
                <InputField {...args} />
            </div>
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {
    label: 'Input Field',
    autoFocus: true,
    disabled: false,
    direction: 'ltr',
    prefix: <h6>₹</h6>,
    suffix: <h6>.sellerspot.in</h6>,
    placeHolder: 'Placeholder text',
    state: 'default',
    required: false,
    value: 'Prefilled Value',
    helperMessage: {
        enabled: true,
        content: 'Loading data...',
        type: 'loading',
    },
} as IInputFieldProps;

export default {
    title: 'Components/Atoms/InputField',
    component: Component,
} as Meta;
