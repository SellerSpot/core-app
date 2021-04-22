import { apiService } from 'services/services';

export const initializeGlobalServices = async (): Promise<void> => {
    apiService.initiateService();
};

export const updateGlobalServices = async (token: string): Promise<void> => {
    console.log(token);
    apiService.initiateService();
};
