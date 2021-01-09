import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getNotificationStyles = (): {
    notificationWrapper: string;
    notificationContainer: string;
    notificationActive: string;
    notificationCounter: string;
} => {
    const notificationWrapper = css`
        width: auto;
        height: auto;
        margin-right: 20px;
    `;

    const notificationContainer = css`
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: ${COLORS.FOREGROUND_TERTIARY};
        font-size: 25px;
        cursor: pointer;
        position: relative;
        &:hover {
            background-color: ${COLORS.BACKGROUND_HIGHLIGHT};
        }
    `;

    const notificationActive = css`
        border-radius: 50%;
        background-color: ${COLORS.BACKGROUND_HIGHLIGHT};
    `;

    const notificationCounter = css`
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${COLORS.BACKGROUND_DANGER};
        color: ${COLORS.FOREGROUND_WHITE};
        font-size: 10px;
        font-weight: normal;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return { notificationWrapper, notificationContainer, notificationActive, notificationCounter };
};
