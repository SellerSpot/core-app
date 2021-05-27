import * as authRequest from './AuthRequest';
import * as catalogue from './Catalogue';

export const requests = {
    ...authRequest,
    catalogue: { ...catalogue },
};
