import { IBreadCrumbsProps } from 'components/Atoms/Breadcrumbs/Breadcrumbs.types';
import { IWorkSpaceTileProps } from '../WorkSpaceTile/WorkSpaceTile.types';

export interface IAppBarProps {
    breadcrumbs?: IBreadCrumbsProps['crumbs'];
    currentWorkspace: Pick<IWorkSpaceTileProps, 'workspaceIcon' | 'workspaceTitle'>;
}
