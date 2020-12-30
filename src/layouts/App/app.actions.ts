import { socketService } from 'services/services';
import { unAuthenticate } from 'store/models/auth';
import { store } from 'store/store';

export const verifyAuthToken = async (): Promise<void> => {
    try {
        const authState = store.getState().auth;
        if (authState.isAuthenticated) {
            const response = await socketService.request('AUTH_VERIFY_TOKEN');
            if (!response.status) {
                // previously authenticated and token expired or not found state - clearing auth state(loging out the user)
                throw response;
            }
        }
    } catch (error) {
        // show some message that relogin again - login expired
        store.dispatch(unAuthenticate());
    }
    return Promise.resolve();
};
