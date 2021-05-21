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
                routesToWatch: [ROUTES.HOME],
                redirectRoute: ROUTES.HOME,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.settingsIcon),
                title: 'Management',
                routesToWatch: [ROUTES.MANAGEMENT.DEFAULT],
                redirectRoute: ROUTES.MANAGEMENT.DEFAULT,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.cashRegister),
                title: 'Point of Sale',
                routesToWatch: [ROUTES.POS.DEFAULT],
                redirectRoute: ROUTES.POS.DEFAULT,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.outlineListAlt),
                title: 'Catalogue',
                routesToWatch: [ROUTES.CATALOGUE.DEFAULT],
                redirectRoute: ROUTES.CATALOGUE.DEFAULT,
            },
        ];
    };
}
