import { IBreadCrumbsProps } from 'components/Atoms/BreadCrumbs/BreadCrumbs.types';
import { IWorkSpaceTileProps } from '../WorkSpaceTile/WorkSpaceTile.types';

export interface IAppBarProps {
    breadcrumbs?: IBreadCrumbsProps['crumbs'];
    currentWorkspace: Pick<IWorkSpaceTileProps, 'workspaceIcon' | 'workspaceTitle'>;
}
