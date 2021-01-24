import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const breadCrumbsStyles = (): {
    breadCrumbsWrapper: string;
    breadCrumbsContainer: string;
    breadCrumbNode: string;
    breadCrumb: string;
    breadCrumbWithLink: string;
    iconHolder: string;
    titleHolder: string;
    breadCrumbSeparator: string;
} => {
    const breadCrumbsWrapper = css`
        width: auto;
        height: auto;
        user-select: none;
    `;

    const breadCrumbsContainer = css`
        width: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 15px;
        line-height: 16px;
        height: 16px; // incase of image( in future breadcrumbs)
        font-weight: normal;
        color: ${COLORS.FOREGROUND_SECONDARY};
        padding-left: 10px;
    `;

    const breadCrumb = css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 5px;
        border-radius: 5px;
    `;

    const breadCrumbNode = css`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const breadCrumbWithLink = css`
        cursor: pointer;
        &:hover {
            background-color: ${COLORS.BACKGROUND_HIGHLIGHT};
        }
    `;

    const iconHolder = css`
        margin-right: 5px;
    `;

    const titleHolder = css`
        max-width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `;

    const breadCrumbSeparator = css`
        font-size: 25px;
        margin-bottom: 1px;
        opacity: 0.4;
        margin: 0 -5px;
    `;

    return {
        breadCrumbsWrapper,
        breadCrumbsContainer,
        breadCrumbNode,
        breadCrumb,
        breadCrumbWithLink,
        iconHolder,
        titleHolder,
        breadCrumbSeparator,
    };
};
