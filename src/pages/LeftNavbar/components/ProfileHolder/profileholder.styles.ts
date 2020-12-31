import { css } from '@emotion/css';
import { COLORS } from 'config/colors';

export const getProfileHolderStyles = (): {
    profileHolderWrapper: string;
    profileHolderContainer: string;
    profileContentWrapper: string;
    profileImageWrapper: string;
    profileImageHolder: string;
    profileUserDetailsHolder: string;
    profileUserName: string;
    profileUserEmail: string;
    caretHolder: string;
    caretOnMenuOpen: string;
    profileMenuWrapper: string;
    menuItem: string;
    activeHoverGray: string;
} => {
    const profileHolderWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 0 10px 0 10px;
    `;

    const profileHolderContainer = css`
        width: 100%;
        height: 100%;
        position: relative;
    `;

    const profileContentWrapper = css`
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        padding: 0 10px 0 10px;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 40px 1fr 10px;
        gap: 10px;
        &:hover {
            background-color: ${COLORS.BACKGROUND_PRIMARY};
        }
    `;

    const profileImageWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    `;

    const profileImageHolder = css`
        font-size: 20px;
        width: 42px;
        height: 42px;
        color: ${COLORS.BACKGROUND_SECONDARY};
        background-color: ${COLORS.BACKGROUND_TERTIARY};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const profileUserDetailsHolder = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    const profileUserName = css`
        font-size: 15px;
        font-weight: bold;
        color: ${COLORS.FOREGROUND_SECONDARY};
        text-transform: capitalize;
    `;

    const profileUserEmail = css`
        font-size: 13px;
        font-weight: normal;
        color: ${COLORS.FOREGROUND_TERTIARY};
    `;

    const caretHolder = css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: ${COLORS.FOREGROUND_TERTIARY};
    `;

    const caretOnMenuOpen = css`
        transform: rotate(180deg);
    `;

    // profile menu holder styles
    const profileMenuWrapper = css`
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 8px;
        background-color: ${COLORS.BACKGROUND_PRIMARY};
        padding-bottom: 60px;
        box-shadow: 0 0 10px 0 ${COLORS.BACKGROUND_TERTIARY};
        z-index: 0;
    `;

    const menuItem = css`
        padding: 0 10px;
        gap: 8px;
    `;

    const activeHoverGray = css`
        &:hover {
            background-color: ${COLORS.BACKGROUND_SECONDARY};
        }
    `;

    return {
        profileHolderWrapper,
        profileHolderContainer,
        profileContentWrapper,
        profileImageWrapper,
        profileImageHolder,
        profileUserDetailsHolder,
        profileUserName,
        profileUserEmail,
        caretHolder,
        caretOnMenuOpen,
        profileMenuWrapper,
        menuItem,
        activeHoverGray,
    };
};
