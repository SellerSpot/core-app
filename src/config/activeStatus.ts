// need to give support cross browsers - may break in some browsers

import { IAppActiveStatus } from 'store/models/app';
import { store } from 'store/store';
import { updateActiveStatus } from '../store/models/app';

const checkActiveStatus = () => {
    store.dispatch(updateActiveStatus(getActiveStatus()));
};

export const getActiveStatus = (): IAppActiveStatus => {
    const status: IAppActiveStatus = {
        isActive: false,
        lastOfflineAt: new Date(),
        lastOnlineAt: new Date(),
    };
    if (navigator.onLine === true) {
        status.isActive = true;
        status.lastOnlineAt = new Date();
    } else {
        status.isActive = false;
        status.lastOfflineAt = new Date();
    }
    return status;
};

export const initiateActiveStatusListener = (): void => {
    window.addEventListener('online', checkActiveStatus);
    window.addEventListener('offline', checkActiveStatus);
};
