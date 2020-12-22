import { apiService, socketService } from 'services/index';

export const initializeGlobals = async (): Promise<void> => {
    socketService.initiateService();
    apiService.initiateService();
};
