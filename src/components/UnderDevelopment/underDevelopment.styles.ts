import { css } from '@emotion/css';

export const getUnderDevelopmentStyles = (): {
    underDevelopmentWrapper: string;
    illustrationImageHolder: string;
    underDevelopmentTitle: string;
} => {
    const underDevelopmentWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    `;

    const illustrationImageHolder = css`
        width: 40%;
    `;

    const underDevelopmentTitle = css`
        font-size: 22px;
        font-weight: bold;
    `;

    return {
        underDevelopmentWrapper,
        illustrationImageHolder,
        underDevelopmentTitle,
    };
};
