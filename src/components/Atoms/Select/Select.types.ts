interface ISelectOption {
    /**
     * Value returned when selected
     */
    value: string | number;
    /**
     * Value shown in UI
     */
    text: string;
}

export interface ISelectProps {
    options: ISelectOption[];
    /**
     * Used to control the value selected
     */
    value: string | number;
    onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
    size: 'small' | 'medium';
}
