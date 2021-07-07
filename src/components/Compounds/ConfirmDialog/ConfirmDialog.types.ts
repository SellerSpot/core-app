import {
    IAlertProps,
    IButtonProps,
    IDialogHeaderProps,
    IDialogProps,
} from '@sellerspot/universal-components';

export interface IConfirmDialogState {
    show: boolean;
    props: IConfirmDialogProps;
    resolve: (result: boolean) => void;
    reject: () => void;
}

export interface IConfirmDialogStateActions {
    confirm: (props: IConfirmDialogProps) => Promise<boolean>;
}

export interface IConfirmDialogProps {
    title?: string;
    dialogCloseCallback?: IDialogHeaderProps['dialogCloseCallback'];
    theme?: IAlertProps['type'];
    content?: string;
    width?: string | number;
    onBackdropClick?: IDialogProps['onBackdropClick'];
    primaryButtonProps?: Omit<IButtonProps, 'onClick'>;
    secondaryButtonProps?: Omit<IButtonProps, 'onClick'>;
}
