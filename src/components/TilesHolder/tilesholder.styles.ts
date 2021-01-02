import { css } from '@emotion/css';

export const getTilesHolderStyles = (): { tilesHolderWrapper: string } => {
    const tilesHolderWrapper = css`
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
    `;

    return {
        tilesHolderWrapper,
    };
};
