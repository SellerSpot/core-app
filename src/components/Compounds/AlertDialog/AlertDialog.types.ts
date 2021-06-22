import {
    IAlertProps,
    IButtonProps,
    IDialogHeaderProps,
    IDialogProps,
} from '@sellerspot/universal-components';

export interface IAlertDialogProps {
    showDialog: boolean;
    title?: string;
    dialogCloseCallback?: IDialogHeaderProps['dialogCloseCallback'];
    theme?: IAlertProps['type'];
    content?: string;
    width?: string | number;
    onBackdropClick?: IDialogProps['onBackdropClick'];
    primaryButtonProps?: IButtonProps;
    secondaryButtonProps?: IButtonProps;
}
