import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import InputFieldComponent from './InputField';
import { IInputFieldProps } from './InputField.types';

const Template: Story<IInputFieldProps> = (args: IInputFieldProps) => {
    return (
        <div
            style={{
                maxWidth: '300px',
            }}
        >
            <InputFieldComponent {...args} />
        </div>
    );
};

export const InputField = Template.bind({});
InputField.args = {
    label: 'Input Field',
    autoFocus: false,
    disabled: false,
    type: 'text',
    direction: 'ltr',
    // prefix: <h6>₹</h6>,
    suffix: <h6>.sellerspot.in</h6>,
    placeHolder: 'Placeholder text',
    state: 'primary',
    required: false,
    value: 'Prefilled Value',
    selectTextOnClick: true,
    helperMessage: {
        enabled: true,
        content: 'Loading data...',
        type: 'loading',
    },
} as IInputFieldProps;

export default {
    title: 'Components/Atoms',
    component: InputFieldComponent,
} as Meta;
