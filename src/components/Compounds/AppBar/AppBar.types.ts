import { IBreadCrumbsProps } from '@sellerspot/universal-components';
import { IWorkSpaceState } from 'store/models/workspaces';

export interface IAppBarProps {
    breadcrumbs: IBreadCrumbsProps['crumbs'];
    noSubMenu: boolean;
    currentWorkspace: IWorkSpaceState['workspaces'][0];
}
