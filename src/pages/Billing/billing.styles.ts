import { css } from '@emotion/css';

export const getBillingStyles = (): { billingWrapper: string } => {
    const billingWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { billingWrapper };
};
