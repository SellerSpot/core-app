import { configureNotify } from '@sellerspot/universal-components';

export const initializeGlobalConfig = async (): Promise<void> => {
    // global configuatrion goes here
    configureNotifyComponent();
};

const configureNotifyComponent = () => {
    configureNotify({
        placement: 'bottomLeft',
        theme: 'default',
        autoHideDuration: 3000,
        showNotifyAction: true,
    });
};
