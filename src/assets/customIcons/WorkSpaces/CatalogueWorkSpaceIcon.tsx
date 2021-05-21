import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function CatalogueWorkSpaceIcon(props: IIconProps): ReactElement {
    const { className, color, size, wrapperClassName } = props;
    return (
        <svg
            viewBox="0 0 27 26"
            className={cn(styles.wrapper, wrapperClassName)}
            style={{ height: size }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={cn(styles.path, className)}
                style={{ fill: color }}
                d="M24.4688 0.349609H2.53125C1.13326 0.349609 0 1.58001 0 3.09782V23.2514C0 24.7692 1.13326 25.9996 2.53125 25.9996H24.4688C25.8667 25.9996 27 24.7692 27 23.2514V3.09782C27 1.58001 25.8667 0.349609 24.4688 0.349609ZM24.1523 23.2514H2.84766C2.76374 23.2514 2.68326 23.2152 2.62392 23.1508C2.56459 23.0864 2.53125 22.999 2.53125 22.9079V3.44135C2.53125 3.35024 2.56459 3.26286 2.62392 3.19844C2.68326 3.13402 2.76374 3.09782 2.84766 3.09782H24.1523C24.2363 3.09782 24.3167 3.13402 24.3761 3.19844C24.4354 3.26286 24.4688 3.35024 24.4688 3.44135V22.9079C24.4688 22.999 24.4354 23.0864 24.3761 23.1508C24.3167 23.2152 24.2363 23.2514 24.1523 23.2514ZM21.9375 17.984V19.3581C21.9375 19.7375 21.6542 20.0451 21.3047 20.0451H10.7578C10.4083 20.0451 10.125 19.7375 10.125 19.3581V17.984C10.125 17.6046 10.4083 17.2969 10.7578 17.2969H21.3047C21.6542 17.2969 21.9375 17.6046 21.9375 17.984ZM21.9375 12.4876V13.8617C21.9375 14.2411 21.6542 14.5487 21.3047 14.5487H10.7578C10.4083 14.5487 10.125 14.2411 10.125 13.8617V12.4876C10.125 12.1081 10.4083 11.8005 10.7578 11.8005H21.3047C21.6542 11.8005 21.9375 12.1081 21.9375 12.4876ZM21.9375 6.99113V8.36523C21.9375 8.74466 21.6542 9.05229 21.3047 9.05229H10.7578C10.4083 9.05229 10.125 8.74466 10.125 8.36523V6.99113C10.125 6.6117 10.4083 6.30407 10.7578 6.30407H21.3047C21.6542 6.30407 21.9375 6.6117 21.9375 6.99113ZM8.64844 7.67818C8.64844 8.81651 7.79846 9.73934 6.75 9.73934C5.70154 9.73934 4.85156 8.81651 4.85156 7.67818C4.85156 6.53985 5.70154 5.61702 6.75 5.61702C7.79846 5.61702 8.64844 6.53985 8.64844 7.67818ZM8.64844 13.1746C8.64844 14.3129 7.79846 15.2358 6.75 15.2358C5.70154 15.2358 4.85156 14.3129 4.85156 13.1746C4.85156 12.0363 5.70154 11.1134 6.75 11.1134C7.79846 11.1134 8.64844 12.0363 8.64844 13.1746ZM8.64844 18.671C8.64844 19.8094 7.79846 20.7322 6.75 20.7322C5.70154 20.7322 4.85156 19.8094 4.85156 18.671C4.85156 17.5327 5.70154 16.6099 6.75 16.6099C7.79846 16.6099 8.64844 17.5327 8.64844 18.671Z"
            />
        </svg>
    );
}
