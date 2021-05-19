import React, { ReactElement } from 'react';

export interface IPointOfSaleWorkSpaceIconProps {
    className: string;
}

export default function PointOfSaleWorkSpaceIcon(
    props: IPointOfSaleWorkSpaceIconProps,
): ReactElement {
    const { className } = props;
    return (
        <svg
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M22 4.25C21.25 4.25 20.75 4.875 20.75 5.625V18C20.75 18.75 21.25 19.25 22 19.375C22.75 19.375 23.25 18.75 23.25 18V5.625C23.25 4.875 22.75 4.25 22 4.25ZM17.5 0.5H2.75C1.625 0.5 0.75 1.375 0.75 2.5V19.75C0.75 20.875 1.625 21.75 2.75 21.75H4.5V24.25C4.5 25 5 25.5 5.75 25.5H13.25C14 25.5 14.5 25 14.5 24.25V21.75H17.5C18.625 21.75 19.5 20.875 19.5 19.75V2.5C19.5 1.375 18.625 0.5 17.5 0.5ZM3.25 8H7V10.5H3.25V8ZM12 11.75V14.25H8.25V11.75H12ZM8.25 10.5V8H12V10.5H8.25ZM12 15.5V18H8.25V15.5H12ZM3.25 11.75H7V14.25H3.25V11.75ZM3.25 18V15.5H7V18H3.25ZM7 24.25H5.75V21.75H7V24.25ZM13.25 24.25H9.5V21.75H13.25V24.25ZM17 18H13.25V15.5H17V18ZM17 14.25H13.25V11.75H17V14.25ZM17 10.5H13.25V8H17V10.5ZM17 5.5H3.25V3H17V5.5Z" />
        </svg>
    );
}
