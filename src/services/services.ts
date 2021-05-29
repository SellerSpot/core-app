import { default as ApiService } from './ApiService';
import { default as SaleService } from './SaleService';
export { default as RouteManager } from './RouteManager';

export const apiService = new ApiService({ token: '' });
export const saleService = new SaleService();
