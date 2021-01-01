import { css } from '@emotion/css';

export const getNotificationsStyles = (): { notificationsWrapper: string } => {
    const notificationsWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { notificationsWrapper };
};
