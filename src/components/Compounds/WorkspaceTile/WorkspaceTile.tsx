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
};

export default function WorkspaceTile(props: IWorkspaceTileProps) {
    const requiredProps = merge(defaultProps, props);

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.expanded]: requiredProps.expanded },
        { [styles.selected]: requiredProps.selected },
        requiredProps.className?.wrapper,
    );

    return (
        <div className={wrapperClassName} style={requiredProps.style?.wrapper}>
            <Avatar
                content={requiredProps.workspaceIcon}
                theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
            />
        </div>
    );
}
