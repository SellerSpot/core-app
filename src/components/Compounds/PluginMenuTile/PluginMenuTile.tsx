import { ICONS } from 'utilities/icons/icons';
import React, { ReactElement } from 'react';
import { merge } from 'lodash';
import cn from 'classnames';
import { Avatar, ToolTip } from '@sellerspot/universal-components';
import { IPluginMenuTileProps } from './PluginMenuTile.types';
import styles from './PluginMenuTile.module.scss';
import Icon from '@iconify/react';

const defaultProps: IPluginMenuTileProps = {
    toolTipText: '',
    expanded: false,
    pluginIcon: <Icon icon={ICONS.helpCircleOutline} />,
    selected: false,
    variant: 'tile',
    pluginTitle: 'Home',
    size: 'small',
};

export const PluginMenuTile = (props: IPluginMenuTileProps): ReactElement => {
    const requiredProps = merge({}, defaultProps, props);

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.wrapperExpanded]: requiredProps.expanded },
        { [styles.wrapperSelected]: requiredProps.selected },
        { [styles.wrapperPluginIndicator]: requiredProps.variant === 'PluginIndicator' },
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
                    content={requiredProps.pluginIcon}
                    theme={requiredProps.selected ? 'selectedNoBg' : 'unselected'}
                />

                <h5 className={titleClassName}>{requiredProps.pluginTitle}</h5>
            </div>
        </ToolTip>
    );
};
