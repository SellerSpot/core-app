import React, { ReactElement } from 'react';

export interface ICashRegisterIconProps {
    className?: string;
}

export default function CashRegisterIcon(props: ICashRegisterIconProps): ReactElement {
    const {} = props;
    return (
        <div style={{ color: 'white' }}>
            <svg width="20" height="17" viewBox="0 0 20 17" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="current"
                    stroke="current"
                    d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69V2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z"
                />
            </svg>
        </div>
    );
}
