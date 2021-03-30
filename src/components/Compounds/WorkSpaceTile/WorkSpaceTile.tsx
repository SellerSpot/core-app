import cn from 'classnames';
import Avatar from 'components/Atoms/Avatar/Avatar';
import { merge } from 'lodash';
import React from 'react';
import { ICONS } from 'utilities/icons';
import styles from './WorkSpaceTile.module.scss';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';

const defaultProps: IWorkSpaceTileProps = {
    expanded: false,
    workspaceIcon: <ICONS.OTHER.DEFAULT />,
    selected: false,
    varient: 'tile',
    workspaceTitle: 'Home',
};

export default function WorkSpaceTile(props: IWorkSpaceTileProps) {
    const requiredProps = merge({}, defaultProps, props);

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.wrapperExpanded]: requiredProps.expanded },
        { [styles.wrapperSelected]: requiredProps.selected },
        { [styles.wrapperWorkSpaceIndicator]: requiredProps.varient === 'workspaceIndicator' },
    );

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: requiredProps.selected },
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
            <Avatar
                content={requiredProps.workspaceIcon}
                theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
            />
            <h5 className={titleClassName}>{requiredProps.workspaceTitle}</h5>
        </div>
    );
}
