import { IIconProps } from 'assets/customIcons/customIcons.types';
import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from '../customIcons.module.scss';

export default function DomainSettingsSubMenuIcon(props: IIconProps): ReactElement {
    const { className, color, size, wrapperClassName } = props;
    return (
        <svg
            viewBox="0 0 24 24"
            className={cn(styles.wrapper, wrapperClassName)}
            style={{ height: size }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={cn(styles.path, className)}
                style={{ fill: color }}
                d="M12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0ZM20.3016 7.2H16.4436C16.2641 5.84978 16.038 4.50618 15.7656 3.1716C17.671 3.99232 19.2615 5.40484 20.3016 7.2ZM13.2168 2.4864C13.2984 2.9088 13.6812 4.932 13.9908 7.2H10.0068C10.3188 4.932 10.7004 2.9088 10.782 2.4864C11.184 2.436 11.5872 2.4 12 2.4C12.4128 2.4 12.816 2.436 13.2168 2.4864ZM14.4 12C14.4 12.7176 14.3484 13.5432 14.268 14.4H9.732C9.6516 13.5432 9.6 12.7176 9.6 12C9.6 11.2824 9.6516 10.4568 9.732 9.6H14.268C14.3484 10.4568 14.4 11.2824 14.4 12ZM8.2344 3.1716C7.962 4.50618 7.73586 5.84978 7.5564 7.2H3.6984C4.73845 5.40484 6.32895 3.99232 8.2344 3.1716ZM2.7144 9.6H7.3008C7.2408 10.4016 7.2 11.2128 7.2 12C7.2 12.7872 7.2396 13.5984 7.302 14.4H2.7156C2.5164 13.632 2.4 12.8304 2.4 12C2.4 11.1696 2.5176 10.368 2.7156 9.6H2.7144ZM3.6984 16.8H7.5564C7.782 18.5088 8.0604 19.98 8.2344 20.8284C6.32895 20.0077 4.73845 18.5952 3.6984 16.8ZM10.7832 21.5136C10.4848 19.9493 10.2267 18.3776 10.0092 16.8H13.9932C13.7738 18.3774 13.5153 19.949 13.218 21.5136C12.8184 21.5652 12.414 21.6 12.0012 21.6C11.5884 21.6 11.1852 21.564 10.7844 21.5136H10.7832ZM15.7656 20.8296C16.0379 19.4946 16.264 18.1506 16.4436 16.8H20.3016C19.2615 18.5952 17.671 20.0077 15.7656 20.8284V20.8296ZM21.2856 14.4H16.6992C16.7592 13.5984 16.8 12.7872 16.8 12C16.8 11.2128 16.7604 10.4016 16.698 9.6H21.282C21.4824 10.368 21.6 11.1696 21.6 12C21.6 12.8304 21.4836 13.632 21.2844 14.4H21.2856Z"
            />
        </svg>
    );
}
