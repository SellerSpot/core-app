import { configureNotify } from '@sellerspot/universal-components';

export const initializeGlobalConfig = async (): Promise<void> => {
    // global configuatrion goes here
    configureNotifyComponent();
    // disabling scroll to zoom across the application
    disableScrollToZoom();
};

const configureNotifyComponent = () => {
    configureNotify({
        placement: 'bottomLeft',
        theme: 'default',
        autoHideDuration: 3000,
        showNotifyAction: true,
    });
};

const restrictZoomOnCondition = (event: WheelEvent) => {
    if (!!event.ctrlKey) {
        event.preventDefault();
    }
};

const disableScrollToZoom = () => {
    document.addEventListener('wheel', restrictZoomOnCondition, { passive: false });
};
