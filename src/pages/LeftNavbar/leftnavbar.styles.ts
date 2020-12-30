import { css } from '@emotion/css';
import { COLORS } from 'config/cssVariables';

export const getStyles = (): { leftnavWrapper: string; logoHolder: string } => {
    const leftnavWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: ${COLORS.BACKGROUND_SECONDARY};
        padding: 10px;
    `;

    const logoHolder = css``;

    return {
        leftnavWrapper,
        logoHolder,
    };
};
