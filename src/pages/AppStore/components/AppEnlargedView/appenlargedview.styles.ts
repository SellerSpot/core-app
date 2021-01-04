import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getEnlargedAppViewStyles = (): {
    enlargedAppViewWrapper: string;
    enlargedAppViewContainer: string;
    appviewHeader: string;
    iconContainer: string;
    iconHolder: string;
    detailsHolder: string;
    appTitle: string;
    appShortDescription: string;
    appCalltoAction: string;
    bannerImageHolder: string;
    bannerImageWrapper: string;
    bannerImageContainer: string;
    bannerImage: string;
    longDescriptionWrapper: string;
} => {
    const enlargedAppViewWrapper = css`
        width: 100%;
        height: 200%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 5%;
    `;
    const enlargedAppViewContainer = css`
        width: 60%;
        height: auto;
    `;
    const appviewHeader = css`
        display: grid;
        grid-template-columns: 150px 1fr 150px;
        gap: 25px;
        width: 100%;
        height: 120px;
    `;

    const iconContainer = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const iconHolder = css`
        width: 120px;
        height: 120px;
        box-shadow: 0 0 10px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
        background-color: ${COLORS.BACKGROUND_PRIMARY};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80px;
        border-radius: 15px;
    `;

    const detailsHolder = css`
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 15px;
        margin-top: 10px;
        color: ${COLORS.FOREGROUND_SECONDARY};
    `;

    const appTitle = css`
        font-size: 25px;
        font-weight: bold;
    `;

    const appShortDescription = css`
        font-size: 16px;
        font-weight: normal;
    `;

    const appCalltoAction = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const bannerImageHolder = css`
        margin-top: 50px;
        width: 100%;
        height: 250px;
        overflow-x: auto;
    `;

    const bannerImageWrapper = css`
        width: 100%;
        height: 100%;
        display: grid;
        overflow-x: auto;
        align-items: center;
        grid-auto-flow: column;
        grid-auto-columns: minmax(350px, 1fr);
        gap: 30px;
        padding: 20px;
        &::-webkit-scrollbar {
            display: none;
        }
    `;

    const bannerImageContainer = css`
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px 0 ${COLORS.BACKGROUND_HIGHLIGHT};
    `;

    const bannerImage = css`
        width: auto;
        height: auto;
        width: 100%;
        height: 100%;
    `;

    const longDescriptionWrapper = css`
        font-size: 16px;
        margin-top: 30px;
        line-height: 25px;
        padding: 15px;
    `;

    return {
        enlargedAppViewWrapper,
        enlargedAppViewContainer,
        appviewHeader,
        iconContainer,
        iconHolder,
        detailsHolder,
        appTitle,
        appShortDescription,
        appCalltoAction,
        bannerImageHolder,
        bannerImageWrapper,
        bannerImageContainer,
        bannerImage,
        longDescriptionWrapper,
    };
};
