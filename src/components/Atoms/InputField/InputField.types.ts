import { ReactElement, ChangeEvent } from 'react';

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
    size?: 'medium' | 'small';
    fullWidth?: boolean;
    /**
     * Direction of text input
     */
    direction?: 'ltr' | 'rtl';
    placeHolder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    helperMessage?: {
        enabled: boolean;
        content?: string;
        type?: 'loading' | 'success' | 'error' | 'warning' | 'none';
    };
}
