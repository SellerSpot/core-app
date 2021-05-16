import { ICONS } from 'utilities/icons';
import React, { ReactElement } from 'react';
import { merge } from 'lodash';
import cn from 'classnames';
import { Avatar, ToolTip } from '@sellerspot/universal-components';
import { IWorkSpaceTileProps } from './WorkSpaceTile.types';
import styles from './WorkSpaceTile.module.scss';

const defaultProps: IWorkSpaceTileProps = {
    toolTipText: '',
    expanded: false,
    workspaceIcon: <ICONS.BsQuestionSquare />,
    selected: false,
    variant: 'tile',
    workspaceTitle: 'Home',
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
                <div>
                    <Avatar
                        content={requiredProps.workspaceIcon}
                        theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
                    />
                </div>
                <h5 className={titleClassName}>{requiredProps.workspaceTitle}</h5>
            </div>
        </ToolTip>
    );
};
