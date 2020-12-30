import { css } from '@emotion/css';

export const getProfileHolderStyles = (): { profileHolderWrapper: string } => {
    const profileHolderWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
    `;
    return {
        profileHolderWrapper,
    };
};
