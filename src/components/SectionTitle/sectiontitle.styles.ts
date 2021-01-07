import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getSectionTitleStyles = (): { sectionTitleWrapper: string } => {
    const sectionTitleWrapper = css`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 20px;
        font-weight: bold;
        color: ${COLORS.FOREGROUND_SECONDARY};
        padding: 10px 0;
        cursor: pointer;
        user-select: none;
    `;

    return {
        sectionTitleWrapper,
    };
};
