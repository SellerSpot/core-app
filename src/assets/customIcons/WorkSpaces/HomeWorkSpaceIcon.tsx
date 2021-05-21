import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function HomeWorkSpaceIcon(props: IIconProps): ReactElement {
    const { className, color, size, wrapperClassName } = props;
    return (
        <svg
            viewBox="0 0 20 24"
            className={cn(styles.wrapper, wrapperClassName)}
            style={{ height: size }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={cn(styles.path, className)}
                style={{ fill: color }}
                d="M10 0.75L20 8.25V23.25H13.75V14.5H6.25V23.25H0V8.25L10 0.75Z"
            />
        </svg>
    );
}
