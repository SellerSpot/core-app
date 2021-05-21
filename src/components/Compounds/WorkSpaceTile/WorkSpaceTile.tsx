import { ICONS } from 'utilities/icons/icons';
import React, { ReactElement } from 'react';
import { merge } from 'lodash';
import cn from 'classnames';
import { Avatar, ToolTip } from '@sellerspot/universal-components';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';
import styles from './WorkSpaceTile.module.scss';
import Icon from '@iconify/react';

const defaultProps: IWorkSpaceTileProps = {
    toolTipText: '',
    expanded: false,
    workspaceIcon: <Icon icon={ICONS.helpCircleOutline} />,
    selected: false,
    variant: 'tile',
    workspaceTitle: 'Home',
    size: 'small',
};

export const WorkSpaceTile = (props: IWorkSpaceTileProps): ReactElement => {
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
        { [styles.titleLarge]: requiredProps.size === 'large' },
    );

    return (
        <ToolTip content={requiredProps.toolTipText} enterDelay={500} placement={'right'}>
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

                <h6 className={titleClassName}>{requiredProps.workspaceTitle}</h6>
            </div>
        </ToolTip>
    );
};
