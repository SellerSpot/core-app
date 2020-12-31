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
        padding: 5px 0px;
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
        gap: 5px;
        cursor: pointer;
        &:hover {
            background-color: ${COLORS.BACKGROUND_PRIMARY};
        }
    `;

    const menuItemActive = css`
        background-color: ${COLORS.BACKGROUND_PRIMARY};
    `;

    const menuItemIcon = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: ${COLORS.FOREGROUND_SECONDARY};
    `;

    const menuItemTitle = css`
        width: 100%;
        height: 100%;
        margin-top: 1px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 18px;
        font-weight: bold;
        color: ${COLORS.FOREGROUND_SECONDARY};
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
