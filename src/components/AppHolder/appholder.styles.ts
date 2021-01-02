import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getAppHolderStyles = (): {
    appHolderWrapper: string;
    iconHolder: string;
    titleHolder: string;
    descriptionHolder: string;
} => {
    const appHolderWrapper = css`
        width: 150px;
        height: 160px;
        background: gray;
        color: ${COLORS.FOREGROUND_SECONDARY};
        background-color: ${COLORS.BACKGROUND_PRIMARY};
        padding: 20px 15px 5px 18px;
        border-radius: 15px;
        box-shadow: 0 0 10px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
        display: grid;
        grid-template-rows: 41% 10% 1fr;
        text-align: left;
    `;

    const iconHolder = css`
        font-size: 40px;
        font-weight: bold;
    `;

    const titleHolder = css`
        font-size: 16px;
        font-weight: bold;
    `;

    const descriptionHolder = css`
        font-size: 12px;
        padding-top: 12px;
        font-weight: snormal;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    return {
        appHolderWrapper,
        iconHolder,
        titleHolder,
        descriptionHolder,
    };
};
