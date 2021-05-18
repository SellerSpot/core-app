import { ApiService } from './ApiService';
import { SaleService } from './SaleService';

export const apiService = new ApiService({ token: '' });
export const saleService = new SaleService();
