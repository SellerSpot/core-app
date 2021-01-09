import { css } from '@emotion/css';

export const getBillingStyles = (): {
    billiingWrapper: string;
    exploreImageWrapper: string;
    contentWrapper: string;
    promotionTitle: string;
    promotionSubTitle: string;
    requestContainer: string;
    requestTitle: string;
    requestItems: string;
    requestItem: string;
} => {
    const billiingWrapper = css`
        width: 100%;
        height: 100%;
        padding: 50px;
        padding-bottom: 0px;
        position: relative;
    `;

    const exploreImageWrapper = css`
        position: absolute;
        bottom: 0;
        right: 0;
        width: 40%;
        height: auto;
    `;

    const contentWrapper = css`
        margin-top: 50px;
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 50px;
    `;

    const promotionTitle = css`
        font-size: 28px;
        font-weight: bold;
        line-height: 45px;
    `;

    const promotionSubTitle = css`
        font-size: 25px;
    `;

    const requestContainer = css``;

    const requestTitle = css`
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
    `;

    const requestItems = css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-left: 20px;
        margin-top: 20px;
    `;

    const requestItem = css`
        display: flex;
        font-size: 20px;
        gap: 10px;
    `;

    return {
        billiingWrapper,
        exploreImageWrapper,
        contentWrapper,
        promotionTitle,
        promotionSubTitle,
        requestContainer,
        requestTitle,
        requestItems,
        requestItem,
    };
};
