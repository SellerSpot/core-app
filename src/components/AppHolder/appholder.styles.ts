import { css } from '@emotion/css';
import { COLORS } from 'config/colors';
import { IAppHolderProps } from './AppHolder';

export const getAppHolderStyles = (
    props: IAppHolderProps,
): {
    appHolderWrapper: string;
    iconHolder: string;
    titleHolder: string;
    descriptionHolder: string;
    holderType: string;
    holderTypeIcon: string;
    holderTypeText: string;
} => {
    const appHolderWrapper = css`
        width: 150px;
        height: 160px;
        background: gray;
        color: ${COLORS.FOREGROUND_SECONDARY};
        background-color: ${COLORS.BACKGROUND_PRIMARY};
        padding: 20px 15px 5px 18px;
        border-radius: 15px;
        box-shadow: 0 0 5px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
        display: grid;
        grid-template-rows: 41% 10% 1fr;
        text-align: left;
        user-select: none;
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 10px 5px ${COLORS.BACKGROUND_HIGHLIGHT};
        }
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

    const holderType = css`
        position: absolute;
        top: 25px;
        right: 10px;
        padding: 0px 5px;
        border-radius: 10px;
        ${props.type === 'app'
            ? `
            color: ${props.installed ? COLORS.FOREGROUND_WHITE : COLORS.APP_COLOR};
            background-color: ${props.installed ? COLORS.APP_COLOR : COLORS.FOREGROUND_WHITE};
            `
            : `
            color: ${props.installed ? COLORS.FOREGROUND_WHITE : COLORS.PLUGIN_COLOR};
            background-color: ${props.installed ? COLORS.PLUGIN_COLOR : COLORS.FOREGROUND_WHITE};
        `}
    `;

    const holderTypeIcon = css`
        font-size: 16px;
        margin-top: 4px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 3px;
    `;

    const holderTypeText = css`
        font-size: 10px;
        display: inline-block;
        vertical-align: middle;
    `;

    return {
        appHolderWrapper,
        iconHolder,
        titleHolder,
        descriptionHolder,
        holderType,
        holderTypeIcon,
        holderTypeText,
    };
};
