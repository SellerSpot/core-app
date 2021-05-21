import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function BillingSubMenuIcon(props: IIconProps): ReactElement {
    const { className, color, size, wrapperClassName } = props;
    return (
        <svg
            viewBox="0 0 16 16"
            className={cn(styles.wrapper, wrapperClassName)}
            style={{ height: size }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={cn(styles.path, className)}
                style={{ fill: color }}
                d="M14 3H2C1.73478 3 1.48043 3.10536 1.29289 3.29289C1.10536 3.48043 1 3.73478 1 4V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3V3ZM14 4V5.5H2V4H14ZM2 12V6.5H14V12H2Z"
                fill="black"
            />
            <path
                className={cn(styles.path, className)}
                style={{ fill: color }}
                d="M3 10H8V11H3V10Z"
            />
        </svg>
    );
}
