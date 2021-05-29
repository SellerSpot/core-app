import { ROUTES } from 'config/routes';
import { ICONS } from 'utilities/utilities';
import { TPlugins } from './PluginMenu.types';

export class PluginMenuService {
    static getPlugins = (): Partial<TPlugins> => {
        return {
            HOME: {
                icon: ICONS.homeVariant,
                title: 'Home',
                routeKey: 'HOME',
                redirectRoute: ROUTES.HOME,
            },
            MANAGEMENT: {
                icon: ICONS.settingsIcon,
                title: 'Management',
                routeKey: 'MANAGEMENT',
                redirectRoute: ROUTES.MANAGEMENT,
            },
            POS: {
                icon: ICONS.cashRegister,
                title: 'Point Of Sale',
                routeKey: 'POS',
                redirectRoute: ROUTES.POS,
            },
            CATALOGUE: {
                icon: ICONS.outlineListAlt,
                title: 'Catalogue',
                routeKey: 'CATALOGUE',
                redirectRoute: ROUTES.CATALOGUE,
            },
        };
    };
}