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
                selected: false,
                redirectRoute: ROUTES.HOME,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.settingsIcon),
                title: 'Management',
                selected: false,
                redirectRoute: ROUTES.MANAGEMENT.DEFAULT,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.cashRegister),
                title: 'Point of Sale',
                selected: false,
                redirectRoute: ROUTES.POS.DEFAULT,
            },
            {
                icon: getWorkSpaceMenuTileIcon(ICONS.outlineListAlt),
                title: 'Catalogue',
                selected: false,
                redirectRoute: ROUTES.CATALOGUE.DEFAULT,
            },
        ];
    };
}
