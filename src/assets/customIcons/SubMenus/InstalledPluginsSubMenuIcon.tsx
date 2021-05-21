import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function InstalledPluginsSubMenuIcon(props: IIconProps): ReactElement {
    const { className, color, size, wrapperClassName } = props;
    return (
        <svg
            viewBox="0 0 24 24"
            className={cn(styles.wrapper, wrapperClassName)}
            style={{ height: size }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={cn(styles.pathStroke, className)}
                style={{ stroke: color }}
                d="M17 12L12 17L7 12M12 6V16V6ZM12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1Z"
                strokeWidth="2"
            />
        </svg>
    );
}
