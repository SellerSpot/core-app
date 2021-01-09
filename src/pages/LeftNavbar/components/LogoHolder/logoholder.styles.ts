import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getLogoHolderStyles = (): {
    logoHolderWrapper: string;
    logoWrapper: string;
    logoImage: string;
    logoTitle: string;
} => {
    const logoHolderWrapper = css`
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    `;
    const logoWrapper = css`
        display: flex;
        flex-direction: row;
        gap: 15px;
        align-items: center;
        justify-content: flex-start;
    `;
    const logoImage = css`
        width: 38px;
        height: 38px;
    `;
    const logoTitle = css`
        font-size: 30px;
        font-weight: bold;
        color: ${COLORS.FOREGROUND_PRIMARY};
        letter-spacing: 2px;
    `;

    return {
        logoHolderWrapper,
        logoWrapper,
        logoImage,
        logoTitle,
    };
};
