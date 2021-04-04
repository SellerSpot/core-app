import cn from 'classnames';
import Avatar from 'components/Atoms/Avatar/Avatar';
import { merge } from 'lodash';
import React, { ReactElement } from 'react';
import { ICONS } from 'utilities/icons';
import styles from './WorkSpaceTile.module.scss';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';

const defaultProps: IWorkSpaceTileProps = {
    expanded: false,
    workspaceIcon: <ICONS.OTHER.DEFAULT />,
    selected: false,
    variant: 'tile',
    workspaceTitle: 'Home',
};

export default function WorkSpaceTile(props: IWorkSpaceTileProps): ReactElement {
    const requiredProps = merge({}, defaultProps, props);

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.wrapperExpanded]: requiredProps.expanded },
        { [styles.wrapperSelected]: requiredProps.selected },
        { [styles.wrapperWorkSpaceIndicator]: requiredProps.variant === 'workspaceIndicator' },
    );

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: requiredProps.selected },
        { [styles.titleCollapsed]: !requiredProps.expanded },
        { [styles.titleExpanded]: requiredProps.expanded },
    );

    return (
        <div
            className={wrapperClassName}
            onClick={requiredProps.events?.onClick}
            onFocus={requiredProps.events?.onFocus}
            onMouseOver={requiredProps.events?.oneMouseOver}
            onMouseLeave={requiredProps.events?.onMouseLeave}
        >
            <div>
                <Avatar
                    content={requiredProps.workspaceIcon}
                    theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
                />
            </div>
            <h6 className={titleClassName}>{requiredProps.workspaceTitle}</h6>
        </div>
    );
}
