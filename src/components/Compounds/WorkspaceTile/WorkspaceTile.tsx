import Avatar from 'components/Atoms/Avatar/Avatar';
import { merge } from 'lodash';
import React from 'react';
import { ICONS } from 'utilities/icons';
import styles from './WorkspaceTile.module.scss';
import { IWorkspaceTileProps } from './WorkspaceTile.types';
import cn from 'classnames';

const defaultProps: IWorkspaceTileProps = {
    expanded: false,
    workspaceIcon: <ICONS.HomeWorkspace />,
    selected: false,
    workspaceTitle: 'Home',
};

export default function WorkspaceTile(props: IWorkspaceTileProps) {
    const requiredProps = merge(defaultProps, props);

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.wrapperExpanded]: requiredProps.expanded },
        { [styles.wrapperSelected]: requiredProps.selected },
        requiredProps.className?.wrapper,
        requiredProps.className?.selected,
        requiredProps.className?.expanded,
    );

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: requiredProps.selected },
        { [styles.titleExpanded]: requiredProps.expanded },
        requiredProps.className?.title,
    );

    return (
        <div className={wrapperClassName} style={requiredProps.style?.wrapper}>
            <Avatar
                className={requiredProps.className?.avatar}
                style={requiredProps.style?.avatar}
                content={requiredProps.workspaceIcon}
                theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
            />
            <h5 className={titleClassName} style={requiredProps.style?.avatar}>
                {requiredProps.workspaceTitle}
            </h5>
        </div>
    );
}
