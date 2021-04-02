import { ReactNode } from 'react';

export interface IInputFieldProps {
    value?: string;
    label?: string;
    type?: 'button' | 'submit';
    /**
     * Preset themes
     */
    state?: 'default' | 'success' | 'error';
    suffix?: ReactNode;
    prefix?: ReactNode;
    /**
     * Direction of text input
     */
    direction?: 'ltr' | 'rtl';
    placeHolder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
    autoFocus?: boolean;
    disabled?: boolean;
    helperMessage?: {
        enabled: boolean;
        content?: string;
        type?: 'loading' | 'success' | 'error' | 'warning';
    };
}
