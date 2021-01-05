import { ApiService } from './ApiService';
import { SocketService } from './SocketService';
import { InstalledAppDashboardService } from './InstalledAppDashboardService';

export const socketService = new SocketService();
export const apiService = new ApiService();
export const installedAppDashboardService = new InstalledAppDashboardService();
