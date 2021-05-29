import { ROUTES } from 'config/routes';
import { ICONS } from 'utilities/icons/icons';
import { getWorkSpaceMenuTileIcon } from './WorkSpaceMenu';
import { WorkSpaceTiles } from './WorkSpaceMenu.types';
export class WorkSpaceMenuService {
    static getWorkSpaceTiles = (): WorkSpaceTiles[] => {
        return [
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.homeVariant),
                title: 'Home',
                routeKey: 'HOME',
                redirectRoute: ROUTES.HOME,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.settingsIcon),
                title: 'Management',
                routeKey: 'MANAGEMENT',
                redirectRoute: ROUTES.MANAGEMENT,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.cashRegister),
                title: 'Point of Sale',
                routeKey: 'POS',
                redirectRoute: ROUTES.POS,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.outlineListAlt),
                title: 'Catalogue',
                routeKey: 'CATALOGUE',
                redirectRoute: ROUTES.CATALOGUE,
            },
        ];
    };
}
