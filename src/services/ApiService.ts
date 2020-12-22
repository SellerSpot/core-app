import axios, { AxiosInstance } from 'axios';

export class ApiService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = null;
    }

    public initiateService = async (): Promise<void> => {
        this.axios = axios.create({
            // set auth token and default header stuff here
        });
    };

    // all operations goes under here
}
