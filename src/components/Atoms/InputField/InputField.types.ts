import { ReactElement, ChangeEvent } from 'react';

export interface IInputFieldProps {
    value?: string;
    label?: string;
    type?: 'text' | 'password' | 'number';
    /**
     * Preset themes
     */
    state?: 'primary' | 'success' | 'error';
    /**
     * Maximum value incase of numeric input
     */
    maxNumericValue?: number;
    /**
     * Minimum value incase of numeric input
     */
    minNumericValue?: number;
    /**
     * Maximum length for text
     */
    maxLength?: number;
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
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * Toggle to control if the inputField content should be selected on click
     */
    selectTextOnClick?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    helperMessage?: {
        enabled: boolean;
        content?: string;
        type?: 'loading' | 'success' | 'error' | 'warning' | 'none';
    };
}
