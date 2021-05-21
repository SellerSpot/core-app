import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function ManagementWorkSpaceIcon(props: IIconProps): ReactElement {
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
                d="M4.64618 0H2.78771V9.16667H4.64618V0ZM15.9828 9.16667H10.0357L9.29235 8.15833V6.325L10.0357 5.5H15.9828L16.7262 6.41667V8.25L15.9828 9.16667ZM6.69049 14.6667H0.743388L0 13.75V11.9167L0.743388 11H6.69049L7.43388 11.9167V13.75L6.69049 14.6667ZM13.9385 0H12.0801V3.66667H13.9385V0ZM12.0801 11H13.9385V22H12.0801V11ZM4.64618 16.5H2.78771V22H4.64618V16.5ZM19.3281 16.5H25.2566L26 15.5833V13.8417L25.2566 12.925H19.3281L18.5847 13.8417V15.5833L19.3281 16.5ZM23.2309 0H21.3724V11H23.2309V0ZM21.3724 18.3333H23.2309V22H21.3724V18.3333Z"
            />
        </svg>
    );
}
