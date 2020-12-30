import { css, keyframes } from '@emotion/css';

export const getAuthStyles = (): {
    authWrapper: string;
    promotionHolder: string;
    promotionImage: string;
    logoHolder: string;
    logoImage: string;
    logoTitle: string;
    mainContentHolder: string;
} => {
    // keyframes
    const fadeEffectAnimation = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    `;

    const logoImageBounceAnimation = keyframes`
        from {
            margin-top: -100%;
        }

        to {
            margin-top: 0;
        }
    `;

    // css
    const authWrapper = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 40% 1fr;
    `;
    const promotionHolder = css`
        position: relative;
        overflow-y: hidden;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    `;

    const promotionImage = css`
        position: absolute;
        bottom: -14px;
        left: 10%;
        width: 80%;
        animation: ${fadeEffectAnimation} 1s;
    `;

    const logoHolder = css`
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 25%;
        animation: ${fadeEffectAnimation} 0.5s;
        position: relative;
    `;

    const logoImage = css`
        width: 100px;
        position: absolute;
        animation: ${logoImageBounceAnimation} 1s;
    `;

    const logoTitle = css`
        font-size: 45px;
        font-weight: bold;
        color: #ff9800;
        letter-spacing: 5px;
        margin-top: 150px;
    `;

    const mainContentHolder = css`
        width: 100%;
        height: 100%;
        background: #ffffff;
        overflow-y: auto;
        overflow-x: hidden;
    `;

    return {
        authWrapper,
        logoHolder,
        logoImage,
        logoTitle,
        mainContentHolder,
        promotionHolder,
        promotionImage,
    };
};
