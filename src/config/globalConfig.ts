import { configureNotify } from '@sellerspot/universal-components';
import { initiateActiveStatusListener } from './activeStatus';

export const initializeGlobalConfig = async (): Promise<void> => {
    // initiate app active status listener
    initiateActiveStatusListener();

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
