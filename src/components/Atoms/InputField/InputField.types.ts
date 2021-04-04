import { ReactElement } from 'react';

export interface IInputFieldProps {
    value?: string;
    label?: string;
    type?: 'text' | 'password' | 'number';
    /**
     * Preset themes
     */
    state?: 'default' | 'success' | 'error';
    suffix?: ReactElement;
    prefix?: ReactElement;
    /**
     * Direction of text input
     */
    direction?: 'ltr' | 'rtl';
    placeHolder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    helperMessage?: {
        enabled: boolean;
        content?: string;
        type?: 'loading' | 'success' | 'error' | 'warning' | 'none';
    };
}
