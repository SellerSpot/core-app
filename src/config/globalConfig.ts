import { apiService, socketService } from 'services/services';
import { store } from 'store/store';

export const initializeGlobalServices = async (): Promise<void> => {
    const authState = store.getState().auth;
    if (authState.isAuthenticated) {
        socketService.initiateService(authState.token);
    } else {
        socketService.initiateService();
    }
    apiService.initiateService();
};

export const updateGlobalServices = async (token: string): Promise<void> => {
    socketService.initiateService(token);
    apiService.initiateService();
};
