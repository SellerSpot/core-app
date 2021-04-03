import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import InputField from './InputField';
import { IInputFieldProps } from './InputField.types';

const Template: Story<IInputFieldProps> = (args: IInputFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
        wrapperRef.current.style.backgroundColor = 'black';
    }, []);
    return (
        <Provider store={store}>
            <ThemeProvider>
                <div
                    style={{
                        maxWidth: '300px',
                    }}
                >
                    <InputField
                        ref={{
                            current: {
                                inputRef,
                                wrapperRef,
                            },
                        }}
                    />
                </div>
            </ThemeProvider>
        </Provider>
    );
};

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
