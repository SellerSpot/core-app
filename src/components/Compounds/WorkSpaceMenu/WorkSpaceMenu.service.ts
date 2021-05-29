import { ROUTES } from 'config/routes';
import { ICONS } from 'utilities/utilities';
import { TWorkSpaces } from './WorkSpaceMenu.types';

export class WorkSpaceMenuService {
    static getWorkSpaces = (): Partial<TWorkSpaces> => {
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
