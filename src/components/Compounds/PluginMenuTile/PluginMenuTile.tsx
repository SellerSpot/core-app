import { Avatar, ToolTip } from '@sellerspot/universal-components';
import cn from 'classnames';
import React, { ReactElement } from 'react';
import styles from './PluginMenuTile.module.scss';
import { IPluginMenuTileProps } from './PluginMenuTile.types';

export const PluginMenuTile = (props: IPluginMenuTileProps): ReactElement => {
    const {
        events,
        expanded = false,
        pluginIcon,
        pluginTitle = 'Plugin',
        selected = false,
    } = props;

    const wrapperClassName = cn(
        styles.wrapper,
        { [styles.wrapperExpanded]: expanded },
        { [styles.wrapperSelected]: selected },
    );

    const titleClassName = cn(
        styles.title,
        { [styles.titleSelected]: selected },
        { [styles.titleCollapsed]: !expanded },
        { [styles.titleExpanded]: expanded },
    );

    const avatarTheme = selected ? 'selectedNoBg' : 'unselected';

    return (
        <ToolTip content={pluginTitle}>
            <div
                className={wrapperClassName}
                onClick={events?.onClick}
                onFocus={events?.onFocus}
                onMouseOver={events?.oneMouseOver}
                onMouseLeave={events?.onMouseLeave}
            >
                <Avatar className={styles.avatarWrapper} content={pluginIcon} theme={avatarTheme} />
                <div className={styles.titleWrapper}>
                    <h5 className={titleClassName}>{pluginTitle}</h5>
                </div>
            </div>
        </ToolTip>
    );
};
