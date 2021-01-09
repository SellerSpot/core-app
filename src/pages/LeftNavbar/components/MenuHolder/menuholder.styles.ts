import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getMenuHolderStyles = (): {
    menuHolderWrapper: string;
    menuContainer: string;
    menuItem: string;
    menuItemActive: string;
    menuItemIcon: string;
    menuItemTitle: string;
} => {
    const menuHolderWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
    `;

    const menuContainer = css`
        width: 100%;
        height: 100%;
    `;

    const menuItem = css`
        width: 100%;
        height: 60px;
        padding: 0px 18px;
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 15px;
        cursor: pointer;
        color: ${COLORS.FOREGROUND_TERTIARY};
        &:hover {
            background-color: ${COLORS.BACKGROUND_HIGHLIGHT};
        }
    `;

    const menuItemActive = css`
        color: ${COLORS.FOREGROUND_SECONDARY};
        background-color: ${COLORS.BACKGROUND_HIGHLIGHT};
    `;

    const menuItemIcon = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
    `;

    const menuItemTitle = css`
        width: 100%;
        height: 100%;
        margin-top: 1px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
    `;

    return {
        menuHolderWrapper,
        menuContainer,
        menuItem,
        menuItemActive,
        menuItemIcon,
        menuItemTitle,
    };
};
