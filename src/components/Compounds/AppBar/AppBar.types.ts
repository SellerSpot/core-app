import { IBreadCrumbsProps } from '@sellerspot/universal-components';
import { IWorkSpaceTileProps } from '../WorkSpaceTile/WorkSpaceTile.types';

export interface IAppBarProps {
    breadcrumbs?: IBreadCrumbsProps['crumbs'];
    currentWorkspace: Pick<IWorkSpaceTileProps, 'workspaceIcon' | 'workspaceTitle'>;
}
