import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getLeftNavBarStyles = (): {
    leftnavWrapper: string;
    logoHolder: string;
    menuHolder: string;
    profileHolder: string;
    leftNavContainer: string;
} => {
    const leftnavWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    `;

    const leftNavContainer = css`
        width: 250px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: ${COLORS.BACKGROUND_SECONDARY};
        padding: 10px 0;
        display: grid;
        grid-template-rows: 50px 1fr 60px;
        user-select: none;
    `;

    const logoHolder = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    `;

    const menuHolder = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    `;

    const profileHolder = css`
        width: 100%;
        height: 100%;
    `;

    return {
        leftnavWrapper,
        leftNavContainer,
        logoHolder,
        menuHolder,
        profileHolder,
    };
};
